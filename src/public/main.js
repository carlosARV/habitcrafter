// Define the public VAPID key for web push notifications
const PUBLIC_VAPID_KEY =
  "BOczlB8X7rQZS1LI-UpUOeecYaz-haoV235eEwKPXcMue1tcJEJdnFhAqMjNhw4b-UdyIQBxMkzFw-aEF6NESQ0";

// Define la suscripción globalmente para ser accesible desde otras partes del código
let globalSubscription = null;

// Function to handle subscription to push notifications
const subscription = async () => {
  // Register a service worker for push notifications
  console.log("Registering a Service worker");
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/"
  });
  console.log("New Service Worker");

  // Subscribe to push notifications
  console.log("Listening Push Notifications");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  });

  console.log(subscription);

  // Set the global subscription
  setGlobalSubscription(subscription);

  // Send subscription data to the server
  sendSubscriptionToServer(subscription);

  console.log("Subscribed!");
};

// Function to convert a base64 string to a Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Function to send subscription data to the server
const sendSubscriptionToServer = async (subscription) => {
  try {
    // Enviar la suscripción al servidor usando una solicitud POST
    await fetch("/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ subscription: subscription })
    });
  } catch (error) {
    console.error('Error sending subscription to server:', error);
  }
};

// Function to set the global subscription
const setGlobalSubscription = (subscription) => {
  globalSubscription = subscription;
};

// Function to get the global subscription
const getGlobalSubscription = () => {
  return globalSubscription;
};

// Check for service worker support and initiate the subscription process
if ("serviceWorker" in navigator) {
  subscription().catch(err => console.log(err));
}
