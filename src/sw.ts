self.addEventListener('install', function(event: InstallEvent) {
	console.log('hello');
});

self.addEventListener('fetch', function(event: FetchEvent) {
	event.respondWith(
		self.caches.match(event.request).then(function(response) {
			return response || self.fetch(event.request);
		})
	);
});
