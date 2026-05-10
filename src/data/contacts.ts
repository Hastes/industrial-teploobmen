export type ContactKind = "phone" | "email";

export type Contact = {
  id: string;
  type: ContactKind;
  label: string;
  value: string;
  href: string;
};

/** Городской номер — замените на финальный; сейчас заглушка под Калининград (4012). */
export const CONTACTS: Contact[] = [
  {
    id: "phone",
    type: "phone",
    label: "Телефон",
    value: "+7 (4012) 000-00-00",
    href: "tel:+74012000000",
  },
  {
    id: "email",
    type: "email",
    label: "Email",
    value: "info@bbizprom.ru",
    href: "mailto:info@bbizprom.ru",
  },
];

export const COMPANY = {
  name: "БалтБизнесПром",
  tagline: "Инженерия движения и тепла",
  /** Подпись в подвале: «Регион работы» */
  regionLabel: "Регион работы",
  region: "Вся Россия",
  deliveryTerms:
    "Теплообменники: изготовление пластинчатых — от 3 рабочих дней, паяные — из наличия. Насосные станции — 4–6 недель. Срок доставки рассчитывается по программе — доступны сухопутная и авиадоставка.",
};
