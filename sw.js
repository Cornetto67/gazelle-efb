const CACHE_NAME = 'gazelle-efb-v39';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './app.js',
    './data.js',
    './settings.js',
    './libs/tailwindcss.js',
    './libs/plotly.js'
];

self.addEventListener('install', (event) => {
    self.skipWaiting(); // FORCE the new service worker to take over immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // FORCE clients to use the new service worker
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Si le rseau rpond, on met  jour le cache et on retourne la rponse
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Si le rseau choue (hors-ligne), on cherche dans le cache
                return caches.match(event.request);
            })
    );
});
