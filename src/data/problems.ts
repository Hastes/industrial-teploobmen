export type ProblemPair = {
  id: string;
  problem: string;
  solution: string;
};

export const PROBLEMS: ProblemPair[] = [
  {
    id: "long-selection",
    problem: "Долгий подбор оборудования и пересогласования",
    solution:
      "Первичный расчёт — от 1 часа по присланному ТЗ, опросному листу или параметрам сред.",
  },
  {
    id: "expensive",
    problem: "Завышенные цены у европейских брендов",
    solution:
      "Аналоги Alfa Laval, Danfoss и Grundfos с экономией до 30% без потери параметров.",
  },
  {
    id: "no-support",
    problem: "Отсутствие инженерной поддержки в проекте",
    solution:
      "Сопровождение инженерами на всех этапах — от расчёта и согласования до запуска.",
  },
  {
    id: "deadlines",
    problem: "Срывы сроков поставки и комплектации",
    solution:
      "Складские позиции и собственное производство — отгрузка от 3 рабочих дней.",
  },
];
