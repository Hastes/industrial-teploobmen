// Kill-switch service worker.
// Если у пользователя в браузере остался зарегистрированный SW от
// другого/старого проекта на localhost:3000, при обновлении этот файл
// сам себя дерегистрирует и чистит кеши, чтобы не было hydration-ошибок
// и stale-HTML.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", async (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      const regs = await self.registration.unregister();
      const clientsList = await self.clients.matchAll({ type: "window" });
      clientsList.forEach((client) => client.navigate(client.url));
      return regs;
    })()
  );
});
