// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyAjlibdBeBneeWFNHOYMWLQkPkJWTW-ZR8",
    authDomain: "aisl-a5532.firebaseapp.com",
    projectId: "aisl-a5532",
    storageBucket: "aisl-a5532.appspot.com",
    messagingSenderId: "366325703916",
    appId: "1:366325703916:web:450677f3281f8c0eccb1c9",
    measurementId: "G-9R0QSE34BX"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });