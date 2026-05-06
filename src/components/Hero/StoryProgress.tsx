"use client";

type Props = {
  total: number;
  current: number;
  durationMs: number;
  isPaused?: boolean;
  onSelect?: (index: number) => void;
};

/**
 * Прогресс-бар как в Telegram Stories: N сегментов внизу.
 * Активный сегмент плавно заполняется CSS-анимацией (linear, durationMs).
 * Пройденные — заполнены целиком, будущие — пустые.
 */
export function StoryProgress({
  total,
  current,
  durationMs,
  isPaused = false,
  onSelect,
}: Props) {
  return (
    <div className="flex w-full items-center gap-2">
      {Array.from({ length: total }, (_, index) => {
        const state =
          index < current ? "done" : index === current ? "active" : "upcoming";

        return (
          <button
            key={index}
            type="button"
            aria-label={`Слайд ${index + 1} из ${total}`}
            onClick={() => onSelect?.(index)}
            className="group relative h-[3px] flex-1 cursor-pointer overflow-hidden rounded-full bg-white/20 transition hover:bg-white/30"
          >
            {state === "done" && (
              <span className="absolute inset-0 origin-left bg-white" />
            )}
            {state === "active" && (
              <span
                key={`active-${index}-${current}`}
                className="absolute inset-0 origin-left bg-white animate-story-progress"
                style={{
                  animationDuration: `${durationMs}ms`,
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
