import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0Yvf4hRE5hqaI9wkskgts-re-MZ8cMCk",
  authDomain: "gare-du-nord-dc39b.firebaseapp.com",
  projectId: "gare-du-nord-dc39b",
  storageBucket: "gare-du-nord-dc39b.appspot.com",
  messagingSenderId: "876784800472",
  appId: "1:876784800472:web:c2f08362614c2f8e5cfdad"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

