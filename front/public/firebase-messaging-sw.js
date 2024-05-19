importScripts(
  "https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.");
});

const firebaseConfig = {
  apiKey: "AIzaSyCwSXSJ9ZEHm8jJ1MKtICg4ujZjAYl2dUc",
  projectId: "icon-e9294",
  messagingSenderId: "233502549164",
  appId: "1:233502549164:web:e8c61860bf98071a756b09",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    icon: "./icon-logo.png",
  };

  if (notificationTitle && notificationOptions.body) {
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});
