const staticCacheName = 'site-static-v3';
const dynamicCacheName = 'site-dynamic-v1';


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
    '/img/icons/icon-144x144.png',
    '/pages/fallback.html'
]

// ServiceWorker install
self.addEventListener('install', evt => {
    console.log("Service worker has been Installed");
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

    // saving the cache files
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets);
        })
    );


    // access with cache files
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchReq => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchReq.clone());
                    return fetchReq;
                })
            });
        }).catch(()=> caches.match('/pages/fallback.html'))

    )


});