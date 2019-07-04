// ServiceWorker install
self.addEventListener('install', evt => {
    console.log("Service worker has been Installed");
})

// activate worker
self.addEventListener("activate", evt=> {
    console.log("Service worker has been activated");
    
})