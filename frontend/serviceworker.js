// const cacheName = 'Klinik-Prima';
// const preCache = ['/'];

// self.addEventListener('install', (e) => {
//   console.log('Service Worker installed');

//   e.waitUntil(
//     (async () => {
//       const cache = await caches.open(cacheName);
//       await cache.addAll(preCache);
//     })()
//   );
// });

// self.addEventListener('fetch', (e) => {
//   e.respondWith(
//     (async () => {
//       const cache = await caches.open(cacheName);
//       const resCache = await cache.match(e.request);

//       if (resCache) return resCache;

//       try {
//         const res = await fetch(e.request);

//         // Filter requests with unsupported schemes
//         if (e.request.url.startsWith('http://') || e.request.url.startsWith('https://')) {
//           cache.put(e.request, res.clone());
//         }

//         return res;
//       } catch (error) {
//         console.log(error);
//         // Optionally, return a fallback response if fetch fails
//         // return caches.match('/fallback.html');
//       }
//     })()
//   );
// });

const CACHE_NAME = 'Klinik-Prima';
const urlsToCache = ['index.html', 'offline.html'];

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Listening for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => caches.match('offline.html'));
    })
  );
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
