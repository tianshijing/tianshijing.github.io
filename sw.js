/**
 * Service Worker for PWA Support
 * Enables offline functionality and caching
 */

const CACHE_NAME = 'juanxi-tian-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/research.html',
    '/blogs.html',
    '/publication_year.html',
    '/assets/css/theme.css',
    '/assets/css/enhancements.css',
    '/assets/css/advanced-enhancements.css',
    '/assets/css/dark-theme.css',
    '/assets/js/theme.js',
    '/assets/js/enhancements.js',
    '/assets/js/advanced-features.js',
    '/assets/img/images/avatar.jpg',
    '/assets/img/favicons/icon.svg',
    '/assets/vendor/aos/dist/aos.css',
    '/assets/vendor/aos/dist/aos.js',
    '/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
