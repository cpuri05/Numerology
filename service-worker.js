const CACHE_NAME = 'numerology-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './numerology_core.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});