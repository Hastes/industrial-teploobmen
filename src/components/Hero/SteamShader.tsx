"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Множитель плотности пара, 0..2. */
  intensity?: number;
  /** Координаты источника пара в UV (0..1). По умолчанию правый-нижний центр. */
  source?: [number, number];
  /** Тёплый/холодный оттенок (RGB 0..1). */
  tint?: [number, number, number];
  className?: string;
};

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
uniform float u_intensity;
uniform vec2  u_source;
uniform vec3  u_tint;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // aspect-correct domain so plumes не растягиваются по горизонтали
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // дрейф вверх + лёгкое боковое колыхание
  vec2 q = vec2(
    p.x + sin(u_time * 0.18 + p.y * 2.2) * 0.045,
    p.y - u_time * 0.035
  );

  // domain warping: один fbm искажает координату второго
  float warp = fbm(q * 2.4);
  float n    = fbm(q * 2.4 + warp * 1.25);

  // по вертикали: гуще в средне-нижней зоне, тает на верху
  float vmask = smoothstep(1.05, 0.20, uv.y) * smoothstep(0.04, 0.28, uv.y);

  // зона источника (ближе к оборудованию)
  vec2 srcUV = vec2(u_source.x * aspect, u_source.y);
  float d = distance(p, srcUV);
  float sourceMask = smoothstep(0.65, 0.10, d);

  float steam = pow(n, 1.7) * vmask * sourceMask * u_intensity;
  steam = clamp(steam, 0.0, 1.0);

  // premultiplied alpha — корректно работает с mix-blend-mode: screen
  gl_FragColor = vec4(u_tint * steam, steam);
}
`;

export function SteamShader({
  intensity = 1,
  source = [0.62, 0.45],
  tint = [0.96, 0.98, 1.0],
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // ref-зеркала, чтобы менять параметры без перезапуска WebGL
  const intensityRef = useRef(intensity);
  const sourceRef = useRef(source);
  const tintRef = useRef(tint);
  intensityRef.current = intensity;
  sourceRef.current = source;
  tintRef.current = tint;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        premultipliedAlpha: true,
        alpha: true,
        antialias: false,
        depth: false,
      }) || canvas.getContext("experimental-webgl");

    if (!gl || !(gl instanceof WebGLRenderingContext)) {
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[SteamShader] shader compile error:", gl.getShaderInfoLog(sh));
        }
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[SteamShader] program link error:", gl.getProgramInfoLog(program));
      }
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const a_pos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(a_pos);
    gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);

    const u_time = gl.getUniformLocation(program, "u_time");
    const u_res = gl.getUniformLocation(program, "u_resolution");
    const u_intensity = gl.getUniformLocation(program, "u_intensity");
    const u_source = gl.getUniformLocation(program, "u_source");
    const u_tint = gl.getUniformLocation(program, "u_tint");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const W = Math.max(1, Math.floor(w * dpr));
      const H = Math.max(1, Math.floor(h * dpr));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
        gl.viewport(0, 0, W, H);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const start = performance.now();
    let raf = 0;
    let prev = start;

    // плавно догоняем целевые параметры (экспоненциальный сглаживатель)
    let curIntensity = intensityRef.current;
    let curSource: [number, number] = [sourceRef.current[0], sourceRef.current[1]];
    let curTint: [number, number, number] = [
      tintRef.current[0],
      tintRef.current[1],
      tintRef.current[2],
    ];

    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

    const renderFrame = (timeSec: number, dt: number) => {
      // half-life ~0.6s
      const k = 1 - Math.exp(-dt / 0.6);
      curIntensity = lerp(curIntensity, intensityRef.current, k);
      curSource[0] = lerp(curSource[0], sourceRef.current[0], k);
      curSource[1] = lerp(curSource[1], sourceRef.current[1], k);
      curTint[0] = lerp(curTint[0], tintRef.current[0], k);
      curTint[1] = lerp(curTint[1], tintRef.current[1], k);
      curTint[2] = lerp(curTint[2], tintRef.current[2], k);

      gl.uniform1f(u_time, timeSec);
      gl.uniform2f(u_res, canvas.width, canvas.height);
      gl.uniform1f(u_intensity, curIntensity);
      gl.uniform2f(u_source, curSource[0], curSource[1]);
      gl.uniform3f(u_tint, curTint[0], curTint[1], curTint[2]);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    if (reduced) {
      renderFrame(0, 0);
    } else {
      const tick = (now: number) => {
        raf = requestAnimationFrame(tick);
        if (!visible) {
          prev = now;
          return;
        }
        const dt = Math.min(0.05, (now - prev) / 1000);
        prev = now;
        renderFrame((now - start) / 1000, dt);
      };
      raf = requestAnimationFrame(tick);
    }

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full mix-blend-screen ${
        className ?? ""
      }`}
    />
  );
}
