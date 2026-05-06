const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Возвращает путь к статике с учётом BASE_PATH (для static export).
 * Принимает абсолютный путь от корня public, например "/assets/images/foo.jpg".
 */
export function assetPath(path: string): string {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  return `${BASE_PATH}${path}`;
}
