export type HeroSteamConfig = {
  /** 0..2 — плотность WebGL-пара поверх картинки. */
  intensity: number;
  /** UV (0..1) источника пара относительно секции. */
  source: [number, number];
  /** RGB (0..1) оттенок: тёплый для горячего пара, холодный — для пара насосной. */
  tint: [number, number, number];
};

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  image: { src: string; alt: string };
  steam: HeroSteamConfig;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "teploobmenniki",
    eyebrow: "Теплообменное оборудование",
    title: "Пластинчатые теплообменники",
    description:
      "Подбор и поставка для ИТП, ГВС и промышленных процессов под ваши параметры, рассчет за 1 час, производство от 3 дней",
    cta: { label: "Подобрать теплообменник", href: "#equipment" },
    image: {
      src: "/assets/images/hero-section-banner-teploobmennik.jpg",
      alt: "Промышленный теплообменник в инженерной системе",
    },
    steam: {
      // тоньше, чем раньше; слегка синий неоновый отлив
      intensity: 0.65,
      source: [0.6, 0.55],
      tint: [0.5, 0.72, 1.0],
    },
  },
  {
    id: "nasosy",
    eyebrow: "Насосные станции",
    title: "Насосные станции",
    description:
      "Повысительные, пожарные и дренажные станции с автоматикой и шкафами управления — комплектация под ключ.",
    cta: { label: "Подобрать насосную станцию", href: "#equipment" },
    image: {
      src: "/assets/images/hero-section-banner-nasos.jpg",
      alt: "Насосная станция со шкафом управления",
    },
    steam: {
      intensity: 0.55,
      source: [0.55, 0.5],
      tint: [0.45, 0.7, 1.0],
    },
  },
];

export const HERO_SLIDE_DURATION_MS = 6000;
export const HERO_FADE_MS = 700;
