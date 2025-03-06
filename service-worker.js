const CACHE_NAME = "smeta-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
<script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(() => console.log("Service Worker зарегистрирован"))
            .catch(err => console.error("Ошибка регистрации SW:", err));
    }
</script>
