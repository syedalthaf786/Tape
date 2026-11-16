var CACHE_NAME = "laying-tape-v4";
var APP_FILES = ["./", "./index.html", "./style.css", "./script.js", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png"];
var PDF_LIBRARY = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(async function (cache) {
    await cache.addAll(APP_FILES);
    try {
      var response = await fetch(PDF_LIBRARY);
      if (response.ok || response.type === "opaque") await cache.put(PDF_LIBRARY, response);
    } catch (error) {
      console.warn("PDF library was not cached for offline use.", error);
    }
    await self.skipWaiting();
  }));
});

self.addEventListener("activate", function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) { return key.indexOf("laying-tape-") === 0 && key !== CACHE_NAME }).map(function (key) { return caches.delete(key) }));
  }).then(function () { return self.clients.claim() }));
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;
  var url = new URL(request.url);
  if (url.href === PDF_LIBRARY) {
    event.respondWith(caches.match(PDF_LIBRARY).then(function (cached) { return cached || fetch(request) }));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(function (response) {
      caches.open(CACHE_NAME).then(function (cache) { cache.put("./index.html", response.clone()) });
      return response;
    }).catch(function () { return caches.match("./index.html") }));
    return;
  }
  event.respondWith(caches.match(request).then(function (cached) {
    if (cached) return cached;
    return fetch(request).then(function (response) {
      if (response.ok) caches.open(CACHE_NAME).then(function (cache) { cache.put(request, response.clone()) });
      return response;
    });
  }));
});
