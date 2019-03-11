//inisiasi cache name
var CACHE_NAME = 'my-pwa-cache-v1';

//membuat url to cache
var urlToCache = [
    '/',
    '/css/main.css',
    '/js/jquery.min.js',
    '/js/main.js'
];

//install service worker
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
                console.log('service worker do install..',cache);
                return cache.addAll(urlToCache);
            })
    );
});

