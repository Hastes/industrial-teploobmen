"use client";

import { useEffect, useRef, useState } from "react";
import { HeroSlideBackground, HeroSlideContent } from "./HeroSlide";
import { StoryProgress } from "./StoryProgress";
import { SteamShader } from "./SteamShader";
import { HERO_SLIDE_DURATION_MS, HERO_SLIDES } from "@/data/hero";

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

  const activeSlide = HERO_SLIDES[current];
  const handleSelect = (index: number) => {
    if (index === current) return;
    setCurrent(index);
  };

  return (
    <section
      id="top"
      aria-roledescription="Слайдер"
      aria-label="Ключевые направления"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink-950"
    >
      {/* 1. Фоновые изображения слайдов + затемняющий градиент */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <HeroSlideBackground
            key={slide.id}
            slide={slide}
            isActive={index === current}
            isPriority={index === 0}
          />
        ))}
      </div>

      {/* 2. Глобальный слой пара (WebGL) поверх фона */}
      <SteamShader
        intensity={activeSlide.steam.intensity}
        source={activeSlide.steam.source}
        tint={activeSlide.steam.tint}
        className="z-10"
      />

      {/* 3. Контент слайдов поверх пара */}
      <div className="absolute inset-0 z-20">
        {HERO_SLIDES.map((slide, index) => (
          <HeroSlideContent
            key={slide.id}
            slide={slide}
            isActive={index === current}
          />
        ))}
      </div>

      {/* 4. Прогресс-бар (Telegram Stories) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
        <div className="mx-auto max-w-[1280px] px-6 pb-8 lg:px-10">
          <div className="pointer-events-auto">
            <StoryProgress
              total={HERO_SLIDES.length}
              current={current}
              durationMs={HERO_SLIDE_DURATION_MS}
              onSelect={handleSelect}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
