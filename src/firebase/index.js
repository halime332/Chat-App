// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//! authentication import
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";



// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASNul-B42m52QxL-x4px0aPjsolqgVf6A",
    authDomain: "fir-chat-47c79.firebaseapp.com",
    projectId: "fir-chat-47c79",
    storageBucket: "fir-chat-47c79.firebasestorage.app",
    messagingSenderId: "958870937084",
    appId: "1:958870937084:web:52fcbf1c958eee6cdfa679"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//!authentication referensını frontende alma (kurulum)
export const auth = getAuth(app);

//!google sağlayıcısının kurulum
export const provider = new GoogleAuthProvider();

//! veri tabanının referansını al (kurulum)
export const db = getFirestore(app);
