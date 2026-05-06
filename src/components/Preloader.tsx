"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { PageReadyContext } from "@/context/PageReadyContext";
import { assetPath } from "@/lib/assetPath";
import NextImage from "next/image";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const PARALLAX_IMAGES = [
  `${base}/assets/parralax/грунт.png`,
  `${base}/assets/parralax/вода.png`,
];

function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function Preloader() {
  const ctx = useContext(PageReadyContext);
  const setPageReady = ctx?.setPageReady;
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);
  const finishedRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setLoaded(true);
      setPageReady?.();
      document.body.classList.remove("preloader-active");
      setTimeout(() => setVisible(false), 600);
    };

    const run = async () => {
      // Fail-safe: прелоадер не должен висеть бесконечно.
      const hardTimeout = window.setTimeout(finish, 2500);
      try {
        await Promise.all([
          Promise.all(PARALLAX_IMAGES.map((src) => loadImage(src))),
          new Promise<void>((resolve) => {
            if (document.readyState === "complete") {
              resolve();
              return;
            }
            const onReady = () => resolve();
            window.addEventListener("load", onReady, { once: true });
            // backup для случаев, когда load уже прошел до подписки
            window.setTimeout(resolve, 1200);
          }),
        ]);
      } finally {
        window.clearTimeout(hardTimeout);
        finish();
      }
    };

    run();
  }, [setPageReady]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink-950 transition-opacity duration-500 ease-out"
      style={{
        opacity: loaded ? 0 : 1,
        pointerEvents: loaded ? "none" : "auto",
      }}
      aria-hidden={loaded}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_75%_100%,rgba(21,45,76,0.65),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_65%_58%,rgba(80,150,255,0.18),transparent_72%)]" />
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: loaded ? 0 : 1 }}
      >
        <div className="flex flex-col items-center gap-7">
          <div className="relative flex flex-col items-center gap-5">
            <NextImage
              src={assetPath("/assets/images/logo_white.png")}
              alt="БалтБизнесПром"
              width={236}
              height={192}
              className="h-11 w-auto object-contain opacity-95 drop-shadow-[0_0_18px_rgba(80,150,255,0.45)]"
              priority
            />
            <div className="flex items-center gap-2">
              <span className="preloader-glow-segment h-1 w-9 rounded-full [animation-delay:0ms]" />
              <span className="preloader-glow-segment h-1 w-9 rounded-full [animation-delay:600ms]" />
              <span className="preloader-glow-segment h-1 w-9 rounded-full [animation-delay:1200ms]" />
            </div>
          </div>
          <span className="font-display text-xs font-medium uppercase tracking-[0.28em] text-[#a9c5e9]/90">
            Загрузка
          </span>
        </div>
      </div>
    </div>
  );
}
