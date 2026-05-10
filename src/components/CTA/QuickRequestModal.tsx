"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type EquipmentKind = "heat-exchanger" | "pump-station";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialKind: EquipmentKind;
};

const UPLOAD_BUCKET =
  process.env.NEXT_PUBLIC_YANDEX_STORAGE_BUCKET ?? "hastes";
const UPLOAD_ENDPOINT =
  process.env.NEXT_PUBLIC_YANDEX_STORAGE_ENDPOINT ??
  "https://storage.yandexcloud.net";
const UPLOAD_PREFIX =
  process.env.NEXT_PUBLIC_YANDEX_STORAGE_UPLOAD_PREFIX ?? "requests";
const PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_YANDEX_STORAGE_PUBLIC_BASE_URL ??
  `${UPLOAD_ENDPOINT.replace(/\/$/, "")}/${UPLOAD_BUCKET}`;

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function generateObjectKey(fileName: string) {
  const safeName = sanitizeFileName(fileName);
  const randomPart = Math.random().toString(36).slice(2, 10);
  const datePart = new Date().toISOString().slice(0, 10);
  return `${UPLOAD_PREFIX}/${datePart}/${randomPart}-${safeName}`;
}

function encodeObjectKey(key: string) {
  return key.split("/").map(encodeURIComponent).join("/");
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  );
}

export function QuickRequestModal({ isOpen, onClose, initialKind }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [kind, setKind] = useState<EquipmentKind>(initialKind);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setKind(initialKind);
    setSubmitted(false);
    setResult("");
    setIsSubmitting(false);
  }, [isOpen, initialKind]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    const submit = async () => {
      event.preventDefault();
      setIsSubmitting(true);
      setResult("");

      const formData = new FormData(form);
      // Временно отключаем отправку файла.
      // Оставляем поле в UI, но из payload удаляем.
      formData.delete("file");

      formData.append("access_key", "4c926f50-5bfe-44fd-b516-302ac6b4c865");
      formData.append(
        "subject",
        `Новая заявка: ${
          kind === "pump-station" ? "насосная станция" : "теплообменник"
        }`,
      );
      formData.append(
        "equipment_kind",
        kind === "pump-station" ? "Насосная станция" : "Теплообменник",
      );

      try {
        // Временно отключено:
        // 1) upload файла в Object Storage
        // 2) передача file_url в Web3Forms

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const data = (await response.json()) as { success?: boolean };
        if (data.success) {
          setSubmitted(true);
          setResult("Заявка успешно отправлена.");
          return;
        }

        setResult("Не удалось отправить заявку. Попробуйте ещё раз.");
      } catch {
        setResult("Ошибка сети. Проверьте подключение и повторите попытку.");
      } finally {
        setIsSubmitting(false);
      }
    };

    void submit();
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal
      aria-hidden={false}
      aria-labelledby="quick-request-title"
      className="fixed inset-0 z-[90]"
    >
      <div
        aria-hidden
        onMouseDown={(event) => {
          event.preventDefault();
          onClose();
        }}
        className="absolute inset-0 bg-ink-950/75 backdrop-blur-sm transition-opacity opacity-100"
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div
          className="pointer-events-auto relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-ink-950 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] transition-all translate-y-0 opacity-100"
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-accent-400/90">
                Быстрый запрос
              </p>
              <h3
                id="quick-request-title"
                className="mt-1 font-display text-2xl font-semibold text-white"
              >
                Заявка за 1 минуту
              </h3>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:bg-white/5 hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>

          {submitted ? (
            <div className="space-y-4 px-5 py-8 sm:px-7 sm:py-10">
              <p className="font-display text-2xl text-white">Заявка отправлена</p>
              <p className="text-sm leading-relaxed text-white/70">
                Спасибо. Менеджер свяжется с вами в ближайшее время для уточнения
                параметров и подготовит расчёт.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex rounded-full bg-accent-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-400"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="px-5 py-6 sm:px-7 sm:py-7">
              <fieldset>
                <legend className="mb-2 text-xs uppercase tracking-[0.2em] text-white/45">
                  Что подбираем
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setKind("heat-exchanger")}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                      kind === "heat-exchanger"
                        ? "border-accent-400/70 bg-accent-400/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/30"
                    }`}
                  >
                    Теплообменник
                  </button>
                  <button
                    type="button"
                    onClick={() => setKind("pump-station")}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                      kind === "pump-station"
                        ? "border-accent-400/70 bg-accent-400/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/30"
                    }`}
                  >
                    Насосная станция
                  </button>
                </div>
              </fieldset>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1.5">
                  <span className="text-xs uppercase tracking-[0.18em] text-white/45">
                    Имя
                  </span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-accent-400/60 focus:bg-white/[0.05]"
                    placeholder="Как к вам обращаться"
                  />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-xs uppercase tracking-[0.18em] text-white/45">
                    Телефон или email
                  </span>
                  <input
                    required
                    name="contact"
                    autoComplete="email"
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-accent-400/60 focus:bg-white/[0.05]"
                    placeholder="+7 (...) или name@mail.ru"
                  />
                </label>
              </div>

              <label className="mt-3 grid gap-1.5">
                <span className="text-xs uppercase tracking-[0.18em] text-white/45">
                  Комментарий
                </span>
                <textarea
                  name="comment"
                  rows={4}
                  className="resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-accent-400/60 focus:bg-white/[0.05]"
                  placeholder={
                    kind === "pump-station"
                      ? "Например: повысительная станция, расход 24 м³/ч, напор 45 м"
                      : "Например: ГВС, 95/70, 2 МВт, паяный или разборный"
                  }
                />
              </label>

              <label className="mt-3 grid gap-1.5">
                <span className="text-xs uppercase tracking-[0.18em] text-white/45">
                  ТЗ или опросный лист (необязательно)
                </span>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar"
                  className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-3 py-2.5 text-sm text-white/75 file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white/85 hover:border-white/30"
                />
              </label>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-white/45">
                  Обычно отвечаем в течение 15 минут в рабочее время.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex rounded-full bg-accent-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Отправляем..." : "Отправить заявку"}
                </button>
              </div>
              {result ? (
                <p
                  className={`mt-3 text-xs ${
                    submitted ? "text-emerald-300/90" : "text-red-300/90"
                  }`}
                >
                  {result}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
