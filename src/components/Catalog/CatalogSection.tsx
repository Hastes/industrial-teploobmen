"use client";

import { useEffect, useState } from "react";
import { CatalogCard } from "./CatalogCard";
import { CatalogDrawer } from "./CatalogDrawer";
import { CATALOG, type CatalogCategory } from "@/data/catalog";

const OPEN_CATALOG_EVENT = "open-catalog-category";
const CLOSE_CATALOG_EVENT = "close-catalog-drawer";

export function CatalogSection() {
  const [active, setActive] = useState<CatalogCategory | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = (category: CatalogCategory) => {
    setActive(category);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent(CLOSE_CATALOG_EVENT));
  };

  useEffect(() => {
    const onOpenCatalog = (event: Event) => {
      const customEvent = event as CustomEvent<{ categoryId?: string }>;
      const categoryId = customEvent.detail?.categoryId;
      if (!categoryId) return;

      const category = CATALOG.find((item) => item.id === categoryId);
      if (!category) return;

      open(category);
    };

    window.addEventListener(OPEN_CATALOG_EVENT, onOpenCatalog);
    return () => window.removeEventListener(OPEN_CATALOG_EVENT, onOpenCatalog);
  }, []);

  return (
    <section
      id="equipment"
      className="relative bg-ink-950 py-24 lg:py-32"
      aria-label="Каталог оборудования"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <header className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
              Каталог
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-white lg:text-5xl">
              Три направления —<br className="hidden sm:block" /> одно решение
              для проекта
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            Пластинчатые теплообменники, блочные тепловые пункты и насосные
            станции под параметры объекта. Работаем по всей России.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {CATALOG.map((category) => (
            <CatalogCard
              key={category.id}
              category={category}
              onOpen={() => open(category)}
            />
          ))}
        </div>
      </div>

      <CatalogDrawer category={active} isOpen={isOpen} onClose={close} />
    </section>
  );
}
