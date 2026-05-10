import Image from "next/image";
import Link from "next/link";
import { COMPANY, CONTACTS, type ContactKind } from "@/data/contacts";
import { assetPath } from "@/lib/assetPath";

function ContactIcon({ kind }: { kind: ContactKind }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-4 w-4",
    "aria-hidden": true as const,
  };
  switch (kind) {
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
  }
}

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Каталог", href: "#equipment" },
  { label: "Для кого", href: "#audiences" },
  { label: "Решения", href: "#solutions" },
  { label: "Процесс", href: "#process" },
  { label: "Кейсы", href: "#cases" },
  { label: "Цена", href: "#pricing" },
];

export function Footer() {
  return (
    <footer
      id="contacts"
      className="relative bg-ink-950 pt-20 lg:pt-24"
      aria-label="Контакты"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-12 border-t border-white/10 pt-14 lg:grid-cols-[1.1fr_1fr_1.4fr] lg:gap-10 lg:pt-16">
          <div className="flex flex-col gap-5">
            <Link
              href="#top"
              aria-label={`${COMPANY.name} — на главную`}
              className="inline-flex items-center gap-3"
            >
              <Image
                src={assetPath("/assets/images/logo_white.png")}
                alt={`Логотип ${COMPANY.name}`}
                width={236}
                height={192}
                className="h-9 w-auto object-contain"
              />
              <span className="font-display text-[15px] font-semibold tracking-tight text-white">
                {COMPANY.name}
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              {COMPANY.tagline}. Подбор, расчёт и поставка теплообменников,
              ИТП и насосных станций под параметры объекта.
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                {COMPANY.regionLabel}
              </p>
              <p className="text-sm text-white/75">{COMPANY.region}</p>
            </div>
          </div>

          <nav aria-label="Разделы сайта" className="flex flex-col gap-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
              Разделы
            </p>
            <ul className="grid grid-cols-2 gap-y-2 text-sm text-white/70">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
              Контакты
            </p>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {CONTACTS.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition hover:border-accent-400/40 hover:bg-white/[0.04]"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition group-hover:border-accent-400/40 group-hover:text-accent-400">
                      <ContactIcon kind={c.type} />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                        {c.label}
                      </span>
                      <span className="truncate text-sm text-white/85 group-hover:text-white">
                        {c.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/40 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. Все права защищены.
          </p>
          <p>
            Реквизиты и юридическая информация — по запросу.
          </p>
        </div>
      </div>
    </footer>
  );
}
