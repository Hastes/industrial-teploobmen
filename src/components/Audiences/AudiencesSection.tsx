import { AUDIENCES, type AudienceIconKey } from "@/data/audiences";

function Icon({
  iconKey,
  className,
}: {
  iconKey: AudienceIconKey;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (iconKey) {
    case "developer":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V9l7-5 7 5v12" />
          <path d="M9 21v-6h6v6" />
          <path d="M9 11h.01M12 11h.01M15 11h.01" />
        </svg>
      );
    case "engineer":
      return (
        <svg {...common}>
          <path d="M4 4.5h16v3H4z" />
          <path d="M4 11h12" />
          <path d="M4 15h16" />
          <path d="M4 19h8" />
          <path d="M18 14l3 3-3 3" />
        </svg>
      );
    case "industry":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M3 21V11l5 3v-3l5 3V8l8-4v17" />
          <path d="M7 17h.01M12 17h.01M17 17h.01" />
        </svg>
      );
    case "utility":
      return (
        <svg {...common}>
          <circle cx={12} cy={12} r={3} />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
          <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
        </svg>
      );
  }
}

export function AudiencesSection() {
  return (
    <section
      id="audiences"
      className="relative bg-ink-900 py-24 lg:py-32"
      aria-label="Для кого"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <header className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
              Для кого
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-white lg:text-5xl">
              Работаем с теми, кто проектирует
              <br className="hidden sm:block" /> и эксплуатирует инженерные
              системы
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            Учитываем требования проекта, нормативы и реальные условия
            эксплуатации — от ИТП в жилом доме до промышленных контуров.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {AUDIENCES.map((a) => (
            <article
              key={a.id}
              className="group relative flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-accent-400/40 hover:bg-white/[0.04]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-400 transition group-hover:border-accent-400/40 group-hover:bg-accent-400/10">
                <Icon iconKey={a.iconKey} className="h-6 w-6" />
              </span>
              <h3 className="font-display text-lg font-semibold leading-snug text-white">
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/65">
                {a.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
