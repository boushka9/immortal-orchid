const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Takes in an array of URLs to pre-cache
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Define custom strategy for caching network requests 
registerRoute(
  // Take in request object and return boolean indicating if the requests destination is style/script/worker
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  // Try to serve a cached response if it exists
  new StaleWhileRevalidate({
    // Cache storage name for assets
    cacheName: 'asset-cache',
    plugins: [
      // Cache only responses w a file:// status code 0, or an HTTP status 200 OK
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60, // Max numbers of entries to cache
        maxAgeSeconds: 30 * 24 * 60 * 60, //30 Days
      })
    ],
  })
);
