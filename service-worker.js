const CACHE_NAME = "gym-tracker-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",

    "./css/style.css",

    "./js/app.js",
    "./js/storage.js",
    "./js/workout-data.js"
	
	"./assets/exercises/machine-chest-press.svg",
    "./assets/exercises/incline-dumbbell-press.svg",
    "./assets/exercises/dumbbell-fly.svg",
    "./assets/exercises/elevated-pushup.svg"
];


self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)
                .then(
                    cache =>
                        cache.addAll(
                            FILES_TO_CACHE
                        )
                )

        );

        self.skipWaiting();

    }
);


self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys()
                .then(
                    cacheNames =>
                        Promise.all(

                            cacheNames
                                .filter(
                                    cacheName =>
                                        cacheName !==
                                        CACHE_NAME
                                )
                                .map(
                                    cacheName =>
                                        caches.delete(
                                            cacheName
                                        )
                                )

                        )
                )

        );

        self.clients.claim();

    }
);


self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(
                event.request
            )
            .then(
                cachedResponse => {

                    if (cachedResponse) {

                        return cachedResponse;

                    }

                    return fetch(
                        event.request
                    );

                }
            )

        );

    }
);