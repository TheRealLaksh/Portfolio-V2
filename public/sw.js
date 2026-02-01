const CACHE_NAME = "laksh-portfolio-v3"; // Bumped version to invalidate old cache
const urlsToCache = ["/", "/index.html", "/favicon.png", "/manifest.json"];

// 1. INSTALL: Cache critical assets
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Forces this SW to become active immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. ACTIVATE: Clean up old caches (Critical for migration)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Clearing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of open clients immediately
});

// 3. FETCH: Smart Strategy with Error Handling
self.addEventListener("fetch", (event) => {
  // Ignore API calls or non-GET requests
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) {
    return;
  }

  // STRATEGY: Network First for HTML (Navigation)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // CHECK: Only cache valid responses! 
          // This prevents caching 404s or 503s from Vercel
          if (!response || !response.ok || response.type !== 'basic') {
            return response;
          }

          // Update cache with the new page
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          // If offline, return cached index.html
          return caches.match('/index.html');
        })
    );
    return;
  }

  // STRATEGY: Cache First for Assets (JS, CSS, Images)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Add .catch() to handle network errors gracefully
      return fetch(event.request).catch((err) => {
          console.warn("Fetch failed for:", event.request.url, err);
          // Return nothing (undefined) or a 404 response to avoid SW crash
          return new Response("Network error", { status: 408, statusText: "Network error" });
      });
    })
  );
});