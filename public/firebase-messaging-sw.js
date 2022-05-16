// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyARXttm2zCcHO6spiUj1v61HAZqWc9E9oU",
    authDomain: "rpmdemoapp-16785.firebaseapp.com",
    projectId: "rpmdemoapp-16785",
    storageBucket: "rpmdemoapp-16785.appspot.com",
    messagingSenderId: "849086876464",
    appId: "1:849086876464:web:c83c77d045851fef4556f5",
    measurementId: "G-XJW2B0HXTL"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    // console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // // Customize notification here
    // const notificationTitle = 'Background Message Title';
    // const notificationOptions = {
    //   body: 'Background Message body.',
    //   icon: '/firebase-logo.png'
    // };
  
    // self.registration.showNotification(notificationTitle,
    //   notificationOptions);
  });