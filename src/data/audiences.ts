export type AudienceIconKey = "developer" | "engineer" | "industry" | "utility";

export type Audience = {
  id: string;
  title: string;
  description: string;
  iconKey: AudienceIconKey;
};

export const AUDIENCES: Audience[] = [
  {
    id: "developer",
    title: "Застройщики и генподрядчики",
    description:
      "Подбор и поставка оборудования для жилых и коммерческих объектов в сжатые сроки.",
    iconKey: "developer",
  },
  {
    id: "engineer",
    title: "Проектные институты и инженеры ОВ",
    description:
      "Расчёты, исходные данные и спецификации под актуальные нормативы и параметры объекта.",
    iconKey: "engineer",
  },
  {
    id: "industry",
    title: "Промышленные предприятия",
    description:
      "Решения для технологических процессов: охлаждение, нагрев, испарение и конденсация.",
    iconKey: "industry",
  },
  {
    id: "utility",
    title: "ЖКХ и теплоснабжающие организации",
    description:
      "Тепловые пункты и насосные группы для ЦТП, ИТП и сетей теплоснабжения.",
    iconKey: "utility",
  },
];
