// Log a message to indicate the service worker is working
console.log('Service Worker Works');

// Event listener for push notifications
self.addEventListener('push', e => {
    // Extract the JSON data from the push event
    const data = e.data.json();
    console.log(data);
    console.log('Notification Received');

    // Show a notification using the received data
    self.registration.showNotification(data.title, {
        body: data.message
    });
});
