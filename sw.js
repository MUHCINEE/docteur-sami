const CACHE_NAME = 'docteur-sami-v1';

// Fichiers à mettre en cache immédiatement lors de l'installation
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './indexDrSami.html',
  './indexCentre.html',
  './style.css',
  './script.js',
  './logos/logo.PNG',
];
// 1. Installation du Service Worker et mise en cache initiale
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. Nettoyage des anciens caches lors de l'activation d'une nouvelle version
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Interception des requêtes (Stratégie: Cache First, fallback sur Network + mise en cache dynamique)
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si la ressource est dans le cache, on la renvoie
      if (cachedResponse) {
        // En arrière-plan, on met à jour le cache si le réseau est disponible
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {/* Ignorer l'erreur réseau si hors-ligne */});

        return cachedResponse;
      }

      // Sinon, on va la chercher sur le réseau et on la met en cache
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});