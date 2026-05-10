"use client";

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import type { CatalogCategory } from "@/data/catalog";

type Props = {
  category: CatalogCategory;
  onOpen: () => void;
};

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function CatalogCard({ category, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Открыть каталог: ${category.title}`}
      className="group relative isolate flex h-[480px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-900 to-ink-950 p-7 text-left transition duration-500 hover:border-accent-400/40 hover:shadow-[0_30px_80px_-30px_rgba(63,166,255,0.4)] focus-visible:border-accent-400/60 focus-visible:outline-none lg:h-[560px] lg:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, rgba(80,150,255,0.18), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <span className="font-display text-sm font-medium tracking-[0.2em] text-white/40">
          {category.number}
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55">
          {category.eyebrow}
        </span>
      </div>

      <div className="relative z-10 mt-6 max-w-md">
        <h3 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white lg:text-[34px]">
          {category.title.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
          {category.description}
        </p>
      </div>

      <div className="pointer-events-none absolute -right-6 bottom-0 z-0 h-[60%] w-[78%] sm:-right-10 lg:-right-10 lg:h-[62%] lg:w-[78%]">
        <Image
          src={assetPath(category.image.src)}
          alt={category.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, 60vw"
          className="object-contain object-bottom-right opacity-90 drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] transition-transform duration-700 group-hover:scale-[1.04]"
          priority={false}
        />
      </div>

      <div className="relative z-10 mt-auto flex items-center gap-4 pt-8 text-white">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition group-hover:border-white group-hover:bg-white group-hover:text-ink-950">
          <ArrowIcon />
        </span>
        <span className="text-sm font-medium tracking-wide text-white/85 group-hover:text-white">
          Открыть каталог
        </span>
      </div>
    </button>
  );
}
