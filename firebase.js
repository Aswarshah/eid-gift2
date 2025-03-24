// Firebase SDK شامل کرنا
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase کنفیگریشن (یہاں وہی کوڈ پیسٹ کرو جو تم نے Firebase Console سے لیا تھا)
const firebaseConfig = {
  apiKey: "تمہاری API Key",
  authDomain: "تمہارا Auth Domain",
  projectId: "تمہارا Project ID",
  storageBucket: "تمہارا Storage Bucket",
  messagingSenderId: "تمہارا Messaging Sender ID",
  appId: "تمہارا App ID"
};

// Firebase انیشیلائز کرنا
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ڈیٹا شامل کرنے کا فنکشن
async function addGreetingMessage(message) {
  try {
    const docRef = await addDoc(collection(db, "eid_messages"), {
      message: message,
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// فنکشن کو ایکسپورٹ کرنا تاکہ index.html میں یوز کر سکو
export { addGreetingMessage };
