import { CASE_HIGHLIGHT_NAMES, CASES } from "@/data/cases";

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[110px_1fr] sm:items-baseline sm:gap-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-white/80">{value}</p>
    </div>
  );
}

export function CasesSection() {
  return (
    <section
      id="cases"
      className="relative bg-ink-950 py-24 lg:py-32"
      aria-label="Кейсы"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <header className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
              Кейсы
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-white lg:text-5xl">
              Реальные объекты и цифры
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            От театров и клиник до ГРЭС, ЖК «{CASE_HIGHLIGHT_NAMES.residentialComplex}» и
            завода «{CASE_HIGHLIGHT_NAMES.factory}» — подбор Serval и AVEKTRA под задачу
            и сроки.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {CASES.map((c) => (
            <article
              key={c.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-900 to-ink-950 transition hover:border-accent-400/40 hover:shadow-[0_30px_80px_-30px_rgba(63,166,255,0.35)]"
            >
              <div className="relative h-52 overflow-hidden border-b border-white/10 bg-gradient-to-br from-ink-800/80 via-ink-900 to-ink-950 lg:h-64">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60 transition duration-700 group-hover:opacity-90"
                  style={{
                    background:
                      "radial-gradient(60% 70% at 70% 30%, rgba(63,166,255,0.22), transparent 70%), radial-gradient(40% 60% at 20% 80%, rgba(80,150,255,0.12), transparent 70%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="relative flex h-full flex-col justify-between p-6 lg:p-7">
                  <span className="inline-flex w-fit rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">
                    {c.category}
                  </span>
                  <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                        Проект
                      </p>
                      <p className="mt-1 line-clamp-3 font-display text-lg font-semibold leading-snug text-white">
                        {c.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-3xl font-semibold leading-none text-accent-400 lg:text-4xl">
                        {c.metric.value}
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/50">
                        {c.metric.label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6 lg:p-7">
                <FieldRow label="Объект" value={c.object} />
                <FieldRow label="Задача" value={c.task} />
                <FieldRow label="Оборудование" value={c.equipment} />
                <FieldRow label="Результат" value={c.result} />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
