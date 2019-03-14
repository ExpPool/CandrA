//inisiasi cache name
var CACHE_NAME = 'my-pwa-cache-v1';

//membuat url to cache
var urlToCache = [
    '/',
    '/css/main.css',
    '/image/ugm.png',
    '/js/jquery.min.js',
    '/js/main.js'
];

//install service worker
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
                console.log('service worker do install..',cache);
                return cache.addAll(urlToCache);
            },

        
        )
    )
});

self.addEventListener('activate',function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                //delete cache jika ada versi lebih baru
                cacheName.filter(function (cacheName){
                    return cacheName ! == CACHE_NAME;
                }).map(function (cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

/* fetch cache */

self.addEventListener('fetch',function(event){
    


    if(urlToCache.origin == location.origin){
        event.respondWith(
            caches.match(request).then(function(response){
                return response || fetch(request);
            })
        )
    } else {
        event.respondWith(
            caches.open('list-mahasiswa-cache-v1')
            .then(function(cache){
            return fetch(request).then(function(liveRequest){
                cache.put(request, liveRequest.clone());
                return liveRequest;
            }).catch(function(){
                return caches.match(request)
                    .then(function(response){
                    if (response) return response;
                    return caches.match('/fallback.json')
                })
            })
            })
        )
        
    }
}
)
