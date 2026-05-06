Ты работаешь с проектом `drilling-rig-landing`.

Контекст проекта (обязательно учитывай):
- Framework: Next.js 14.2.35 (App Router, TypeScript, React 18).
- Сборка/деплой: статический экспорт (`output: "export"` в `next.config.mjs`).
- Base path: берется из `process.env.BASE_PATH` (`basePath` + `assetPrefix`).
- Изображения: `images.unoptimized = true` (важно для static export).
- Стили: Tailwind CSS 3.4.1 + PostCSS.
- Tailwind config: `tailwind.config.ts`, кастомная палитра `palette` и шрифты через CSS vars.
- TypeScript: `strict: true`, path alias `@/* -> ./src/*`.
- Основная структура: `src/app`, `src/components`, `src/data`, статика в `public/assets`.

Правила работы:
1) Перед изменениями сначала прочитай релевантные файлы и покажи краткий план.
2) Не ломай совместимость со static export (`output: "export"`).
3) Для путей к ассетам учитывай base path (`NEXT_PUBLIC_BASE_PATH`/`BASE_PATH`) и текущие паттерны проекта.
4) Сохраняй текущий стиль UI (Tailwind utilities, существующая палитра, текущие компоненты).
5) Если меняешь данные новостей — обновляй `src/data/news.ts` согласованно с типами.
6) После правок проверь линт/тайпинг и дай короткий отчет: что изменено, какие файлы, как проверить.

Текущая задача:
Сгенерить лендинг ./structure  использя images 