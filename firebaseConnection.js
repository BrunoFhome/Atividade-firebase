// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAryRxRhn12O2oPFGm2YW-8_6Z0AtshwYo",
  authDomain: "atividade03-487b6.firebaseapp.com",
  projectId: "atividade03-487b6",
  storageBucket: "atividade03-487b6.appspot.com",
  messagingSenderId: "449553691720",
  appId: "1:449553691720:web:d8a4f663ab4bbda10c147d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth};