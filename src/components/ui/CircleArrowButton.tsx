import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Props = {
  href?: string;
  label: string;
  onClick?: () => void;
} & Omit<ComponentPropsWithoutRef<"button">, "onClick">;

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

/**
 * CTA в стиле макета: круглая обводка со стрелкой + текст справа.
 */
export function CircleArrowButton({ href, label, onClick, ...rest }: Props) {
  const content = (
    <span className="group inline-flex items-center gap-4 text-white">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 transition group-hover:border-white group-hover:bg-white group-hover:text-ink-950">
        <ArrowIcon />
      </span>
      <span className="text-[13px] font-medium tracking-wide text-white/90 group-hover:text-white">
        {label}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex"
      {...rest}
    >
      {content}
    </button>
  );
}
