// ServiceWorker install
self.addEventListener('install', evt => {
    console.log("Service worker has been Installed");
})

// activate worker
self.addEventListener("activate", evt=> {
    console.log("Service worker has been activated");
    
})

// fetch event
self.addEventListener('fetch' , evt=>{
    console.log("Page fetched", evt);

})