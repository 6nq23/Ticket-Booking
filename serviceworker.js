const CACHE_NAME = "ticket-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/cityBusBooking.html",
  "/ticketView.html",
  "/css/homePage.css",
  "/script/homePage.js",
  "/css/style.css",
  "/js/script.js",
  // Add other routes you want cached
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
