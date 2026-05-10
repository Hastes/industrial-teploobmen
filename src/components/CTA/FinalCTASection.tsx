"use client";

import { useEffect, useState } from "react";
import {
  QuickRequestModal,
  type EquipmentKind,
} from "@/components/CTA/QuickRequestModal";
import { OPEN_QUICK_REQUEST_EVENT } from "@/lib/quickRequest";

function ArrowIcon() {
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
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function FinalCTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [equipmentKind, setEquipmentKind] =
    useState<EquipmentKind>("heat-exchanger");

  const openModal = (kind: EquipmentKind) => {
    setEquipmentKind(kind);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const onOpenRequest = (event: Event) => {
      const customEvent = event as CustomEvent<{ kind?: EquipmentKind }>;
      openModal(customEvent.detail?.kind ?? "heat-exchanger");
    };

    window.addEventListener(OPEN_QUICK_REQUEST_EVENT, onOpenRequest);
    return () =>
      window.removeEventListener(OPEN_QUICK_REQUEST_EVENT, onOpenRequest);
  }, []);

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-ink-950 py-24 lg:py-32"
      aria-label="Отправить проект"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 80% at 70% 30%, rgba(63,166,255,0.22), transparent 70%), radial-gradient(40% 60% at 20% 80%, rgba(80,150,255,0.12), transparent 70%), linear-gradient(180deg, #0A0E14 0%, #0E1A2C 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-10 px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.24em] text-accent-400/90">
            Готовы помочь
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            Подберём оборудование
            <br className="hidden sm:block" /> под ваш проект
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/70">
            Пришлите ТЗ, опросный лист или просто параметры сред: первичный
            расчёт — от 1 часа, коммерческое предложение — в течение 1 рабочего
            дня.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          <button
            type="button"
            onClick={() => openModal("heat-exchanger")}
            className="group inline-flex items-center gap-3 rounded-full bg-accent-500 px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_18px_40px_-18px_rgba(63,166,255,0.7)] transition hover:bg-accent-400 hover:shadow-[0_22px_50px_-18px_rgba(63,166,255,0.9)]"
          >
            <span>Отправить проект</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/25">
              <ArrowIcon />
            </span>
          </button>

          <button
            type="button"
            onClick={() => openModal("pump-station")}
            className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/[0.03] px-6 py-3.5 text-[14px] font-medium text-white/90 transition hover:border-white/60 hover:bg-white/[0.07] hover:text-white"
          >
            <span>Получить расчёт</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/30 transition group-hover:border-white/70">
              <ArrowIcon />
            </span>
          </button>

          <span className="text-xs text-white/45">
            Расчёт подбора — от&nbsp;1&nbsp;часа
          </span>
        </div>
      </div>

      <QuickRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialKind={equipmentKind}
      />
    </section>
  );
}
