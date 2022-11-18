import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApfjma71nN95XPQOBXDsYOuMhVEJdTjCc",
  authDomain: "where-is-waldo-a7805.firebaseapp.com",
  projectId: "where-is-waldo-a7805",
  storageBucket: "where-is-waldo-a7805.appspot.com",
  messagingSenderId: "767297795848",
  appId: "1:767297795848:web:4f257556f641c068c05ebd",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
