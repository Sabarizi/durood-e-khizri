import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmmbFvsrZdwgSJ-7qJIRD7kMFk3UKuy6o",
  authDomain: "durood-e-khizri.firebaseapp.com",
  projectId: "durood-e-khizri",
  storageBucket: "durood-e-khizri.appspot.com",
  messagingSenderId: "145767240151",
  appId: "1:145767240151:web:eb6c0db35c21eb50f6fb92",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);