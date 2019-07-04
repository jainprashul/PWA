const assets = [
    './',
    './index.html',
    './css/materialize.css',
    './css/styles.css',
    './img/dish.png',
    './js/app.js',
    './js/materialize.js',
    './js/ui.js',
    './manifest.json'
]

const staticCacheName = 'site-static';

// ServiceWorker install
self.addEventListener('install', evt => {
    console.log("Service worker has been Installed");
});

// activate worker
self.addEventListener("activate", evt=> {
    console.log("Service worker has been activated");
    
});

// fetch event
self.addEventListener('fetch' , evt=>{
    // console.log("Page fetched", evt);
    evt.waitUntil(
        caches.open(staticCacheName).then( cache => {
            cache.addAll(assets);
        })
    );


});