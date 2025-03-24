import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWxGEAYSmqUFXhC-5yp-Y8PtGKHQ_oxFM",
  authDomain: "eid-gift-fe0f6.firebaseapp.com",
  projectId: "eid-gift-fe0f6",
  storageBucket: "eid-gift-fe0f6.firebasestorage.app",
  messagingSenderId: "464963301865",
  appId: "1:464963301865:web:7ec0ae86fd310e09efdb78"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
