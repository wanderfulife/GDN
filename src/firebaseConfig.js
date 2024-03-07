import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGZzNQqjWkt3m3mNDd5yUk5ocAXvyQ6dQ",
  authDomain: "sens-8274a.firebaseapp.com",
  databaseURL: "https://sens-8274a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sens-8274a",
  storageBucket: "sens-8274a.appspot.com",
  messagingSenderId: "352754779211",
  appId: "1:352754779211:web:b7de7aa8d916bfdb5ef9ce"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

