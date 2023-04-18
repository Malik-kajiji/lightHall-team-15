import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

    const firebaseConfig = {
    apiKey: "AIzaSyDXHztfSjykTYHj3lGUMPIUv6zuJiSBltk",
    authDomain: "team-15-6b11a.firebaseapp.com",
    projectId: "team-15-6b11a",
    storageBucket: "team-15-6b11a.appspot.com",
    messagingSenderId: "315927609887",
    appId: "1:315927609887:web:f2f6596b1d3ecc7b3e0b2a"
    };


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)