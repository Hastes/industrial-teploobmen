import { COMPANY } from "@/data/contacts";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative bg-ink-900 py-24 lg:py-32"
      aria-label="Цена"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-900 to-ink-950 p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:p-14">
          <div className="flex flex-col gap-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
              Цена
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white lg:text-4xl">
              Не публикуем фиксированный прайс —
              <br className="hidden sm:block" /> считаем по вашему проекту
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-white/65">
              Каждое решение собирается под параметры объекта: среды, нагрузки,
              автоматика, габариты, требования к уплотнениям и материалам.
              Поэтому стоимость рассчитываем индивидуально после получения ТЗ
              или опросного листа.
            </p>
            <ul className="grid gap-2 text-sm text-white/75">
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                />
                <span>
                  Расчёт под параметры — обычно в течение 1 часа от запроса.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                />
                <span>{COMPANY.deliveryTerms}</span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                />
                <span>Прозрачное КП с разбивкой по позициям и срокам.</span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                />
                <span>Аналоги Alfa Laval, Danfoss, Grundfos без переплаты.</span>
              </li>
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-accent-400/30 bg-gradient-to-br from-accent-500/15 via-accent-500/5 to-transparent p-8 lg:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(60% 60% at 70% 20%, rgba(63,166,255,0.25), transparent 70%)",
              }}
            />
            <div className="relative flex flex-col gap-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-accent-400/85">
                Эффект подбора
              </p>
              <div>
                <p className="font-display text-[88px] font-semibold leading-[0.9] tracking-tight text-white lg:text-[112px]">
                  −30%
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
                  Средняя оптимизация стоимости оборудования на проектах,
                  где мы заменяли импортные позиции на проверенные аналоги.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-white/80">
                  Аналоги без потери параметров
                </span>
                <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-white/80">
                  Оптимизация спецификации
                </span>
                <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-white/80">
                  Производство в РФ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
