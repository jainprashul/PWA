const staticCacheName = 'site-static-v7';
const dynamicCacheName = 'site-dynamic-v5';
const assets = [
    './',
    './index.html',
    './css/materialize.css',
    './css/styles.css',
    './img/dish.png',
    './js/app.js',
    './js/materialize.js',
    './js/ui.js',
    './manifest.json',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/pages/fallback.html'
];

// cache size limit fn
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

// ServiceWorker install
self.addEventListener('install', evt => {
    //console.log("Service worker has been Installed");
    // saving the cache files
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets);
        })
    );
});

// activate worker
self.addEventListener("activate", evt => {
    //console.log("Service worker has been activated");

    // delete the old caches to update the site n every time u update the site u must change the version of staticCacheName 
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    )

});

// fetch event
self.addEventListener('fetch', evt => {
    // console.log("Page fetched", evt);
    // access with cache files
    // run this only if the it does not contain firebase api response
    if(evt.request.url.indexOf("firestore.googleapis.com") === -1){
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchReq => {
                    // add the asset to dynamic-cache
                    return caches.open(dynamicCacheName).then(cache => {
                        cache.put(evt.request.url, fetchReq.clone());
                        // check asset size
                        limitCacheSize(dynamicCacheName, 15);
                        return fetchReq;
                    })
                });
            }).catch(() => {
                if (evt.request.url.indexOf('.html') > 1) {
                    return caches.match('/pages/fallback.html');
                }
            })
        );
    }


});