// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjlibdBeBneeWFNHOYMWLQkPkJWTW-ZR8",
    authDomain: "aisl-a5532.firebaseapp.com",
    projectId: "aisl-a5532",
    storageBucket: "aisl-a5532.appspot.com",
    messagingSenderId: "366325703916",
    appId: "1:366325703916:web:450677f3281f8c0eccb1c9",
    measurementId: "G-9R0QSE34BX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = firebase.messaging();


export const getToken = (setTokenFound) => {
    return messaging.getToken({ vapidKey: 'GENERATED_MESSAGING_KEY' }).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}