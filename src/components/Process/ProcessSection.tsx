import { PROCESS_STEPS, PROCESS_TIMINGS } from "@/data/process";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative bg-ink-900 py-24 lg:py-32"
      aria-label="Как мы работаем"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <header className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
              Как мы работаем
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-white lg:text-5xl">
              Прозрачный процесс
              <br className="hidden sm:block" /> в четыре шага
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {PROCESS_TIMINGS.map((t) => (
              <div
                key={t.label}
                className="flex items-baseline gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2"
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                  {t.label}
                </span>
                <span className="text-sm font-medium text-white/90">
                  {t.value}
                </span>
              </div>
            ))}
          </div>
        </header>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 right-6 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
          />

          <ol className="relative grid gap-4 lg:grid-cols-4 lg:gap-5">
            {PROCESS_STEPS.map((step, i) => (
              <li
                key={step.id}
                className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-ink-950/70 p-6 transition hover:border-accent-400/40 hover:bg-ink-950/90"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-semibold leading-none text-accent-400">
                    {step.number}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1 bg-white/10 transition group-hover:bg-accent-400/30"
                  />
                  {i === PROCESS_STEPS.length - 1 ? (
                    <span
                      aria-hidden
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-accent-400/40 bg-accent-400/10 text-accent-400"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <path d="M5 12l4 4 10-10" />
                      </svg>
                    </span>
                  ) : null}
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
