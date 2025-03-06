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
document.addEventListener("DOMContentLoaded", function () {
    const captureBtn = document.getElementById("captureBtn");

    captureBtn.addEventListener("click", function () {
        if (typeof html2canvas !== "function") {
            console.error("html2canvas не загружен!");
            return;
        }
document.addEventListener("DOMContentLoaded", function () {
    const captureBtn = document.getElementById("captureBtn");

    captureBtn.addEventListener("click", function () {
        if (typeof html2canvas !== "function") {
            console.error("html2canvas не загружен!");
            return;
        }

        html2canvas(document.body).then(canvas => {
            canvas.toBlob(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "screenshot.jpg";
                link.click();
            }, "image/jpeg", 1.0);
        }).catch(error => console.error("Ошибка при создании скриншота:", error));
    });
});
        html2canvas(document.body).then(canvas => {
            canvas.toBlob(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "screenshot.jpg";
                link.click();
            }, "image/jpeg", 1.0);
        }).catch(error => console.error("Ошибка при создании скриншота:", error));
    });
});
