 "use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/data/nav";
import { CATALOG } from "@/data/catalog";
import { assetPath } from "@/lib/assetPath";

const OPEN_CATALOG_EVENT = "open-catalog-category";
const CLOSE_CATALOG_EVENT = "close-catalog-drawer";

function Logo() {
  return (
    <Link
      href="#top"
      aria-label="БалтБизнесПром — на главную"
      className="group inline-flex items-center gap-3"
    >
      <span className="relative flex h-10 w-10 items-center justify-center">
        <Image
          src={assetPath("/assets/images/logo_white.png")}
          alt="Логотип БалтБизнесПром"
          width={236}
          height={192}
          className="h-9 w-auto object-contain"
          priority
        />
      </span>
      <span className="font-display text-[15px] font-semibold tracking-tight text-white/95 group-hover:text-white">
        БалтБизнесПром
      </span>
    </Link>
  );
}

function BurgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={isOpen}
      aria-controls="site-menu"
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/90 transition hover:border-white/30 hover:bg-white/[0.08]"
    >
      <span className="sr-only">Меню</span>
      <span className="relative flex h-4 w-4 items-center justify-center">
        <span
          className={`absolute block h-[1.5px] w-4 bg-current transition ${
            isOpen ? "rotate-45" : "-translate-y-[3px]"
          }`}
        />
        <span
          className={`absolute block h-[1.5px] w-4 bg-current transition ${
            isOpen ? "-rotate-45" : "translate-y-[3px]"
          }`}
        />
      </span>
    </button>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const openCatalogCategory = (categoryId: string) => {
    window.dispatchEvent(
      new CustomEvent(OPEN_CATALOG_EVENT, { detail: { categoryId } }),
    );
  };

  useEffect(() => {
    const onCatalogDrawerClose = () => setIsMenuOpen(false);
    window.addEventListener(CLOSE_CATALOG_EVENT, onCatalogDrawerClose);
    return () =>
      window.removeEventListener(CLOSE_CATALOG_EVENT, onCatalogDrawerClose);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Logo />

        <nav aria-label="Главная навигация" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[13px] text-white/70">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <BurgerButton
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        />
      </div>

      <div
        className={`${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 z-20 bg-black/50 transition ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
          aria-hidden
        />

        <nav
          id="site-menu"
          aria-label="Меню сайта"
          className={`absolute inset-x-0 top-20 z-30 transition ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="rounded-2xl border border-white/10 bg-ink-950/95 p-4 backdrop-blur lg:p-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
                <div>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Основное меню
                  </p>
                  <ul className="grid gap-1 text-sm text-white/80">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="block rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Категории товаров
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {CATALOG.map((category) => (
                      <li key={category.id}>
                        <button
                          type="button"
                          onClick={() => openCatalogCategory(category.id)}
                          className="block rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 transition hover:border-white/25 hover:bg-white/[0.05]"
                        >
                          <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                            {category.eyebrow}
                          </p>
                          <p className="mt-1 text-sm text-white/90">
                            {category.title.replace("\n", " ")}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
