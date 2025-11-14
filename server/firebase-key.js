import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXLWIBBq-je2fS_0UrWdcvQWzYl8SV_gg",
  authDomain: "deliverytrackerapp-bc126.firebaseapp.com",
  projectId: "deliverytrackerapp-bc126",
  storageBucket: "deliverytrackerapp-bc126.firebasestorage.app",
  messagingSenderId: "712568086271",
  appId: "1:712568086271:web:67374d044a7e22536cf6ca"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
