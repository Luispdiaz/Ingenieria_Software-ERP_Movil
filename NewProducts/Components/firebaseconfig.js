// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4Nnvrd4E4DWu3EpMz_-EQM33jC8Nf8lY",
  authDomain: "imagenes-53831.firebaseapp.com",
  projectId: "imagenes-53831",
  storageBucket: "imagenes-53831.appspot.com",
  messagingSenderId: "281102263538",
  appId: "1:281102263538:web:e0ce4dd3006e5a1ab91c6b",
  measurementId: "G-Z8SXKMF0Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app)