// Service Worker for Ahenkan Football Academy PWA
const CACHE_VERSION = 'v4';
const CACHE_NAMES = {
  static: `ahenkan-static-${CACHE_VERSION}`,
  runtime: `ahenkan-runtime-${CACHE_VERSION}`,
  api: `ahenkan-api-${CACHE_VERSION}`
};

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico'
];

// Install event - cache essential files
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAMES.static).then(cache => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS).catch(err => {
          console.log('[Service Worker] Cache addAll error:', err);
        });
      }),
      self.skipWaiting()
    ])
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin and chrome extension requests
  if (url.origin !== location.origin) {
    return;
  }

  // Network-first strategy for API calls
  if (url.pathname.includes('/functions/v1/') || url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Only cache successful responses
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAMES.api).then(cache => {
              cache.put(request, clone);
            });
          }
          return response;
        })
        .catch(error => {
          console.log('[Service Worker] API fetch failed:', error);
          return caches.match(request)
            .then(response => response || new Response(
              JSON.stringify({ error: 'Offline - cached data unavailable' }),
              { status: 503, statusText: 'Service Unavailable', headers: { 'Content-Type': 'application/json' } }
            ));
        })
    );
    return;
  }

  // Always refresh the HTML shell so new deployments become visible promptly.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAMES.runtime).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then(response => response || caches.match('/index.html')))
    );
    return;
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(request)
          .then(response => {
            // Validate response
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clone and cache successful response
            const clone = response.clone();
            caches.open(CACHE_NAMES.runtime).then(cache => {
              cache.put(request, clone);
            });

            return response;
          })
          .catch(error => {
            console.log('[Service Worker] Fetch failed:', error, 'URL:', request.url);
            
            // Return cached version if available
            return caches.match(request)
              .then(response => {
                if (response) {
                  return response;
                }
                
                // Return offline fallback for navigation
                if (request.mode === 'navigate') {
                  return caches.match('/index.html');
                }
                
                return null;
              });
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete old cache versions
          const isOldCache = !Object.values(CACHE_NAMES).includes(cacheName);
          if (isOldCache) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Background sync for offline support
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('[Service Worker] Background sync triggered');
    event.waitUntil(
      // Retry failed API requests when back online
      caches.open(CACHE_NAMES.api).then(cache => {
        return cache.keys().then(requests => {
          return Promise.all(
            requests.map(request => {
              return fetch(request.clone()).then(response => {
                if (response.ok) {
                  cache.put(request, response.clone());
                  console.log('[Service Worker] Synced:', request.url);
                }
              }).catch(err => {
                console.log('[Service Worker] Sync error:', err);
              });
            })
          );
        });
      })
    );
  }
});

// Push notifications support
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Ahenkan Academy',
    icon: new URL('images/logo.png', self.registration.scope).href,
    badge: new URL('images/logo.png', self.registration.scope).href,
    tag: 'ahenkan-notification',
    requireInteraction: false,
    actions: [
      { action: 'open', title: 'Open' },
      { action: 'close', title: 'Close' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Ahenkan Academy', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(windowClients => {
        // Check if app is already open
        for (let client of windowClients) {
          if (client.url === '/' || client.url.includes('localhost')) {
            return client.focus();
          }
        }
        // If not open, open new window
        return clients.openWindow('/');
      })
    );
  }
});
