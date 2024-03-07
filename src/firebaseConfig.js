import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4je9UduPsIZwaUxif3DoQayHBzbNc44M",
  authDomain: "garedn-f79ac.firebaseapp.com",
  projectId: "garedn-f79ac",
  storageBucket: "garedn-f79ac.appspot.com",
  messagingSenderId: "1098851055854",
  appId: "1:1098851055854:web:e93342598306e4977b5bff",
  measurementId: "G-4L0BYQFX69"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

