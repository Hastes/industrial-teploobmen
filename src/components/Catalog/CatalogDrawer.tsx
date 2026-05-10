"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import {
  getEquipmentKindByCategoryId,
  openQuickRequestModal,
} from "@/lib/quickRequest";
import type {
  CatalogCategory,
  CatalogDocument,
  CatalogProduct,
} from "@/data/catalog";

type Props = {
  category: CatalogCategory | null;
  isOpen: boolean;
  onClose: () => void;
};

function CloseIcon() {
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
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  );
}

function DownloadIcon() {
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
      <path d="M12 4v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function DocumentLink({ doc }: { doc: CatalogDocument }) {
  return (
    <a
      href={assetPath(doc.href)}
      download
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm transition hover:border-accent-400/40 hover:bg-white/[0.05]"
    >
      <span className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80 transition group-hover:border-accent-400/40 group-hover:text-accent-400">
          <DownloadIcon />
        </span>
        <span>
          <span className="block text-white/90">{doc.label}</span>
          {doc.meta ? (
            <span className="block text-[11px] uppercase tracking-[0.18em] text-white/45">
              {doc.meta}
            </span>
          ) : null}
        </span>
      </span>
      <span className="text-[11px] uppercase tracking-[0.18em] text-white/45 group-hover:text-white/70">
        Скачать
      </span>
    </a>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`h-4 w-4 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ProductRow({
  product,
  isOpen,
  onToggle,
}: {
  product: CatalogProduct;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const expandable = Boolean(product.features?.length || product.tagline);
  const docs = product.documents ?? [];

  return (
    <li className="bg-white/[0.015] transition hover:bg-white/[0.04]">
      <button
        type="button"
        onClick={expandable ? onToggle : undefined}
        aria-expanded={expandable ? isOpen : undefined}
        className={`flex w-full flex-col gap-3 px-5 py-4 text-left ${
          expandable ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="font-display text-base font-semibold leading-tight text-white">
              {product.name}
            </span>
            {product.series ? (
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                {product.series}
              </span>
            ) : null}
          </div>
          {expandable ? (
            <span
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70"
              aria-hidden
            >
              <ChevronIcon open={isOpen} />
            </span>
          ) : null}
        </div>

        {product.specs.length ? (
          <div className="hidden flex-wrap items-baseline gap-x-5 gap-y-1 text-xs text-white/55 sm:flex">
            {product.specs.slice(0, 3).map((s) => (
              <span key={s.label}>
                <span className="text-white/40">{s.label}: </span>
                <span className="text-white/80">{s.value}</span>
              </span>
            ))}
          </div>
        ) : null}

        {product.description ? (
          <p className="text-sm leading-relaxed text-white/65">
            {product.description}
          </p>
        ) : null}
      </button>

      {docs.length ? (
        <div className="flex flex-wrap gap-2 px-5 pb-4">
          {docs.map((d) => (
            <a
              key={d.href}
              href={assetPath(d.href)}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/85 transition hover:border-accent-400/60 hover:bg-accent-400/10 hover:text-accent-400"
            >
              <DownloadIcon />
              <span>Скачать «{d.label}»</span>
              {d.meta ? (
                <span className="text-white/40">· {d.meta}</span>
              ) : null}
            </a>
          ))}
        </div>
      ) : null}

      {expandable && isOpen ? (
        <div className="border-t border-white/5 bg-ink-900/40 px-5 py-6 lg:px-6 lg:py-7">
          {product.brand ? (
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/45">
              Бренд:{" "}
              <span className="text-white/80">{product.brand}</span>
            </p>
          ) : null}

          {product.tagline ? (
            <p className="rounded-xl border border-accent-400/30 bg-accent-400/5 px-4 py-3 text-sm leading-relaxed text-white/85">
              {product.tagline}
            </p>
          ) : null}

          {product.specs.length ? (
            <dl className="mt-5 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {product.specs.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between gap-3 border-b border-white/5 py-2"
                >
                  <dt className="text-xs uppercase tracking-[0.16em] text-white/45">
                    {s.label}
                  </dt>
                  <dd className="text-right text-sm text-white/85">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {product.features?.length ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {product.features.map((g) => (
                <div key={g.title}>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-accent-400/90">
                    {g.title}
                  </p>
                  <ul className="space-y-1.5 text-sm text-white/75">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-white/40"
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}

          {product.components?.length ? (
            <div className="mt-6">
              <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-white/45">
                В составе
              </p>
              <div className="flex flex-wrap gap-2">
                {product.components.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/75"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {product.compliance?.length ? (
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/55">
              <span className="text-white/40">Соответствие:</span>
              {product.compliance.map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-emerald-400/30 bg-emerald-400/5 px-2 py-1 text-emerald-200/90"
                >
                  {c}
                </span>
              ))}
            </div>
          ) : null}

          {product.documents?.length ? (
            <div className="mt-7">
              <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/50">
                Документы по продукту
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {product.documents.map((d) => (
                  <DocumentLink key={d.href} doc={d} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

export function CatalogDrawer({ category, isOpen, onClose }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [openProductId, setOpenProductId] = useState<string | null>(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchCurrentXRef = useRef(0);
  const touchCurrentYRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  // при смене категории — все коллапсы свёрнуты по умолчанию
  useEffect(() => {
    setOpenProductId(null);
  }, [category]);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.changedTouches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchCurrentXRef.current = touch.clientX;
    touchCurrentYRef.current = touch.clientY;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.changedTouches[0];
    touchCurrentXRef.current = touch.clientX;
    touchCurrentYRef.current = touch.clientY;
  };

  const handleTouchEnd = () => {
    if (!isOpen || window.matchMedia("(min-width: 1024px)").matches) return;

    const deltaX = touchCurrentXRef.current - touchStartXRef.current;
    const deltaY = touchCurrentYRef.current - touchStartYRef.current;
    const horizontalSwipe = deltaX > 80;
    const mostlyHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

    if (horizontalSwipe && mostlyHorizontal) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal={isOpen}
      aria-labelledby={category ? `catalog-${category.id}-title` : undefined}
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[80] ${isOpen ? "" : "pointer-events-none"}`}
    >
      <div
        aria-hidden
        onMouseDown={(event) => {
          event.preventDefault();
          onClose();
        }}
        className={`absolute inset-0 bg-ink-950/70 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`absolute right-0 top-0 flex h-full w-full max-w-[1140px] flex-col border-l border-white/10 bg-ink-950 shadow-[-40px_0_80px_-30px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {category && (
          <>
            <header className="flex items-start justify-between gap-6 border-b border-white/10 px-6 py-6 lg:px-10 lg:py-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                  Каталог · {category.eyebrow}
                </p>
                <h2
                  id={`catalog-${category.id}-title`}
                  className="mt-2 font-display text-3xl font-semibold tracking-tight text-white lg:text-4xl"
                >
                  {category.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:bg-white/5 hover:text-white"
              >
                <CloseIcon />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-8 lg:px-10 lg:py-10">
              <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
                <div>
                  <p className="max-w-xl text-sm leading-relaxed text-white/70">
                    {category.description}
                  </p>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {category.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80"
                      >
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-12">
                    <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-white/50">
                      {category.productsLabel}
                    </p>
                    <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
                      {category.products.map((p) => (
                        <ProductRow
                          key={p.id}
                          product={p}
                          isOpen={openProductId === p.id}
                          onToggle={() =>
                            setOpenProductId((prev) =>
                              prev === p.id ? null : p.id
                            )
                          }
                        />
                      ))}
                    </ul>
                  </div>

                  {category.types?.length ? (
                    <div className="mt-12">
                      <div className="mb-4 flex items-baseline justify-between gap-4">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                          {category.typesLabel ?? "Под ваш проект"}
                        </p>
                        <span className="text-[11px] text-white/35">
                          Индивидуальный подбор
                        </span>
                      </div>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {category.types.map((t) => (
                          <li
                            key={t.id}
                            className="flex h-full flex-col justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-accent-400/30 hover:bg-white/[0.04]"
                          >
                            <div>
                              <h4 className="font-display text-base font-semibold text-white">
                                {t.name}
                              </h4>
                              <p className="mt-2 text-sm leading-relaxed text-white/65">
                                {t.description}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                openQuickRequestModal(
                                  getEquipmentKindByCategoryId(category.id),
                                );
                                onClose();
                              }}
                              className="inline-flex items-center gap-2 self-start text-xs font-medium uppercase tracking-[0.18em] text-accent-400 transition hover:text-white"
                            >
                              Запросить подбор
                              <svg
                                viewBox="0 0 24 24"
                                aria-hidden
                                className="h-3.5 w-3.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <div className="relative hidden lg:block">
                  <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-ink-900 to-ink-950">
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(70% 55% at 50% 35%, rgba(80,150,255,0.18), transparent 70%)",
                      }}
                    />
                    <Image
                      src={assetPath(category.image.src)}
                      alt={category.image.alt}
                      fill
                      sizes="280px"
                      className="object-contain object-center p-6 drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <footer className="flex flex-col gap-3 border-t border-white/10 bg-ink-950/80 px-6 py-5 backdrop-blur lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-6">
              <p className="text-xs text-white/55">
                Первичный расчёт — от 1 часа, коммерческое предложение — в
                течение 1 рабочего дня.
              </p>
              <button
                type="button"
                onClick={() => {
                  openQuickRequestModal(
                    getEquipmentKindByCategoryId(category.id),
                  );
                  onClose();
                }}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-ink-950 transition hover:bg-accent-400 hover:text-white"
              >
                {category.cta.label}
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
