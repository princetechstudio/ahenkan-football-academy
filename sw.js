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
  '/manifest.json',
  '/favicon.ico'
];

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

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== location.origin || request.method !== 'GET') {
    return;
  }

  if (url.pathname.includes('/functions/v1/') || url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAMES.api).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(error => {
          console.log('[Service Worker] API fetch failed:', error);
          return caches.match(request).then(response => response || new Response(
            JSON.stringify({ error: 'Offline - cached data unavailable' }),
            { status: 503, statusText: 'Service Unavailable', headers: { 'Content-Type': 'application/json' } }
          ));
        })
    );
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAMES.static).then(cache => cache.put(new Request('/index.html'), copy));
          }
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const fetchResponse = fetch(request).then(response => {
        if (response && response.ok && request.url.startsWith(self.location.origin)) {
          const clone = response.clone();
          caches.open(CACHE_NAMES.runtime).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => cached || Response.error());

      return cached || fetchResponse;
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
  console.log('[Service Worker] Push notification received');

  let notificationData = {
    title: 'Ahenkan Football Academy',
    options: {
      body: 'New update from Ahenkan Academy',
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      tag: 'ahenkan-notification',
      requireInteraction: false,
      data: {
        url: '/'
      }
    }
  };

  // Parse push event data if available
  if (event.data) {
    try {
      const payload = event.data.json();
      notificationData = {
        title: payload.title || 'Ahenkan Football Academy',
        options: {
          body: payload.body || 'New update from Ahenkan Academy',
          icon: payload.icon || '/icon-192x192.png',
          badge: payload.badge || '/badge-72x72.png',
          tag: payload.tag || 'ahenkan-notification',
          requireInteraction: payload.requireInteraction || false,
          data: {
            url: payload.data?.url || '/',
            type: payload.data?.type || 'notification'
          },
          actions: [
            { action: 'open', title: 'Open' },
            { action: 'close', title: 'Close' }
          ]
        }
      };
      console.log('[Service Worker] Notification data:', notificationData);
    } catch (err) {
      console.log('[Service Worker] Could not parse push data as JSON:', err);
      // Fall back to text
      if (event.data.text) {
        notificationData.options.body = event.data.text();
      }
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData.options)
      .then(() => console.log('[Service Worker] Notification shown'))
      .catch(err => console.error('[Service Worker] Failed to show notification:', err))
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification clicked:', event.action);
  event.notification.close();

  const notificationData = event.notification.data || { url: '/' };
  const targetUrl = notificationData.url || '/';

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(windowClients => {
        // Check if app is already open
        for (let client of windowClients) {
          if (client.url === '/' || client.url.includes('localhost')) {
            client.postMessage({ type: 'NOTIFICATION_CLICKED', url: targetUrl });
            return client.focus();
          }
        }
        // If not open, open new window with target URL
        return clients.openWindow(targetUrl);
      })
    );
  }
});
