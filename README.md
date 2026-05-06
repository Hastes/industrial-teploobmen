# teploobmenniki-landing

Лендинг «БалтБизнесПром» — теплообменники и насосные станции.

## Стек
- Next.js 14.2.35 (App Router, TypeScript, React 18)
- Tailwind CSS 3.4.1
- Static export (`output: "export"`)

## Команды
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # статический экспорт в out/
npm run lint
npm run typecheck
```

## Base path
Подкладывается из переменной окружения `BASE_PATH`:
```bash
BASE_PATH=/teploobmenniki npm run build
```
В рантайме доступно как `process.env.NEXT_PUBLIC_BASE_PATH`.
Для путей к статике используй `assetPath()` из `src/lib/assetPath.ts`.

## Структура
```
src/
  app/         # layout, page, globals.css
  components/  # Header, Hero, ui-кнопки
  data/        # контент (навигация, слайды Hero)
  lib/         # утилиты
public/assets/ # изображения и шрифты
```
# industrial-teploobmen
