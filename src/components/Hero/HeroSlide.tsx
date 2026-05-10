import Image from "next/image";
import { CircleArrowButton } from "@/components/ui/CircleArrowButton";
import { openQuickRequestModal } from "@/lib/quickRequest";
import { assetPath } from "@/lib/assetPath";
import type { HeroSlide as HeroSlideData } from "@/data/hero";

type LayerProps = {
  slide: HeroSlideData;
  isActive: boolean;
};

export function HeroSlideBackground({
  slide,
  isActive,
  isPriority,
}: LayerProps & { isPriority?: boolean }) {
  return (
    <div
      aria-hidden={!isActive}
      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={assetPath(slide.image.src)}
        alt={slide.image.alt}
        fill
        priority={isPriority}
        sizes="100vw"
        className={`object-cover object-center ${
          isActive ? "animate-slow-zoom" : ""
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
    </div>
  );
}

export function HeroSlideContent({ slide, isActive }: LayerProps) {
  const onRequestClick = () => {
    openQuickRequestModal(
      slide.id === "nasosy" ? "pump-station" : "heat-exchanger",
    );
  };

  return (
    <div
      aria-hidden={!isActive}
      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        isActive ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-center px-6 lg:px-10">
        <div className="max-w-xl">
          <p
            className={`mb-6 text-xs uppercase tracking-[0.22em] text-white/60 transition-all duration-700 ${
              isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            {slide.eyebrow}
          </p>
          <h1
            className={`font-display text-[56px] font-semibold leading-[1.05] tracking-tight text-white transition-all duration-700 sm:text-[68px] lg:text-[88px] ${
              isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {slide.title.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p
            className={`mt-8 max-w-[420px] text-[15px] leading-relaxed text-white/70 transition-all duration-700 delay-75 ${
              isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {slide.description}
          </p>
          <div
            className={`mt-12 transition-all duration-700 delay-150 ${
              isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <CircleArrowButton label={slide.cta.label} onClick={onRequestClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
