import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "@/data/nav";
import { assetPath } from "@/lib/assetPath";

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

function BurgerButton() {
  return (
    <button
      type="button"
      aria-label="Открыть меню"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/90 transition hover:border-white/30 hover:bg-white/[0.08]"
    >
      <span className="sr-only">Меню</span>
      <span className="flex flex-col gap-[5px]">
        <span className="block h-[1.5px] w-4 bg-current" />
        <span className="block h-[1.5px] w-4 bg-current" />
      </span>
    </button>
  );
}

export function Header() {
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
                  className="transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <BurgerButton />
      </div>
    </header>
  );
}
