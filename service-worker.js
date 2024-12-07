//nombre y versión de la caché constante
const CACHE_NAME = "DylanCache";

//ficheros a guardar en la aplicación offline
var urlsToCache = [
    './',
    './assets/img/favicon-16x16.png',
    './assets/img/favicon-32x32.png',
    './assets/img/favicon-64x64.png',
    './assets/img/favicon-96x96.png',
    './assets/img/favicon-128x128.png',
    './assets/img/favicon-192x192.png',
    './assets/img/favicon-256x256.png',
    './assets/img/favicon-384x384.png',
    './assets/img/favicon-512x512.png',
    './assets/img/favicon-1024x1024.png',
    './assets/img/favicon.jpg'
];

//evento para instalar
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    })
                    .catch(err => {
                        console.log('No se ha cargado la caché', err);
                    })
            })
    );
});


self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
        .then(cacheNames =>
            {
            return Promise.all(
                cacheNames.map(cacheName =>
                     {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() =>
            {
            self.clients.claim();
        })
);
});

//evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    return res;
                }
                return fetch(e.request);
            })
    );
});
