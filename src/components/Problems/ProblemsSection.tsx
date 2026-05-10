import { PROBLEMS } from "@/data/problems";

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
      aria-hidden
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden
    >
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ProblemsSection() {
  return (
    <section
      id="solutions"
      className="relative bg-ink-950 py-24 lg:py-32"
      aria-label="Проблемы и решения"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(63,166,255,0.08),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        <header className="mb-12 flex flex-col gap-5 lg:mb-16 lg:max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
            Что мы берём на себя
          </p>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-white lg:text-5xl">
            С чем приходят клиенты — и&nbsp;что меняется с нами
          </h2>
          <p className="text-sm leading-relaxed text-white/60">
            Подбор, расчёт, комплектация и сопровождение — закрываем основные
            боли проектов теплоснабжения и водоподготовки.
          </p>
        </header>

        <ul className="grid gap-3 lg:gap-4">
          {PROBLEMS.map((p) => (
            <li
              key={p.id}
              className="group grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-accent-400/30 hover:bg-white/[0.04] lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-7 lg:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-400/30 bg-red-400/[0.06] text-red-300/90">
                  <MinusIcon />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                    Было
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/85">
                    {p.problem}
                  </p>
                </div>
              </div>

              <span className="hidden text-white/25 transition group-hover:text-accent-400/70 lg:inline-flex">
                <ArrowIcon />
              </span>

              <div className="flex items-start gap-3 rounded-xl border border-accent-400/15 bg-accent-400/[0.04] p-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent-400/40 bg-accent-400/10 text-accent-400">
                  <CheckIcon />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent-400/85">
                    Стало
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/90">
                    {p.solution}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
