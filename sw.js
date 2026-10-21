// Offline support for the Future Energies Proposal Builder.
// After you change any file and redeploy, raise the version number so phones pick up the update.
const CACHE = 'fe-proposals-v6';

const ART = [
  'p1-deco', 'p1-tri', 'p1-stats', 'p2-deco', 'p3-top', 'p3-bottom', 'p4-leaf', 'p4-panel', 'p5-sprig', 'p6-right', 'p6-dot', 'p6-bottom',
  'feat-sun', 'feat-monitor', 'feat-shield',
  'ic-user', 'ic-phone', 'ic-mail', 'ic-clipboard', 'ic-panel', 'ic-idcard', 'ic-calendar', 'ic-person',
  'ic-truck', 'ic-doc', 'ic-bulb', 'ic-notes', 'ic-hourglass', 'ic-useradd', 'ic-chart',
  'ic-amc-shield', 'ic-amc-check', 'ic-amc-shield2', 'ic-amc-search', 'ic-amc-truck', 'ic-warranty',
  'ic-phone-big', 'ic-pin', 'ic-mail-white', 'ic-phone-white', 'ic-insta-white'
];
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/logo.png',
  'assets/photo.jpg',
  'assets/vendor/html2canvas.min.js',
  ...['waaree.png', 'havells.svg', 'deye.png', 'adani.png', 'renewsys.png', 'vikram.png', 'tata-power.png', 'premier.png'].map(b => `assets/brands/${b}`),
  ...ART.map(a => `assets/art/${a}.svg`),
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-64.png',
  ...['400-normal', '400-italic', '600-normal', '600-italic'].map(w => `assets/fonts/bodoni-moda-latin-${w}.woff2`),
  ...['400', '500', '600', '700'].flatMap(w => [`assets/fonts/noto-sans-latin-${w}-normal.woff2`, `assets/fonts/noto-sans-latin-ext-${w}-normal.woff2`]),
  ...['500', '600'].map(w => `assets/fonts/barlow-latin-${w}-normal.woff2`)
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // The page itself: use the latest version when online, the saved copy when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('index.html', copy)); }
          return res;
        })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // Images, fonts, icons: serve the saved copy straight away and refresh it in the background.
  event.respondWith(
    caches.match(req).then(hit => {
      const fresh = fetch(req)
        .then(res => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
          return res;
        })
        .catch(() => hit);
      return hit || fresh;
    })
  );
});
