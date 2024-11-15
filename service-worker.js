// service-worker.js

// Install event: caching the necessary files
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('site-cache').then((cache) => {
            return cache.addAll([
                '/', // Root URL
                '/index.html', // Main page
                '/styles.css', // CSS file
                '/herny.png', // Logo image
                '/script.js', // JavaScript file
                '/passwords.json', // Password data (if used)
                '/server.js', // Server-side JS (if applicable)
                '/app.py' // Python backend file (if applicable)
            ]);
        })
    );
});

// Fetch event: responding with cached files or network requests
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request); // If cached, return the cached response, otherwise fetch from network
        })
    );
});
