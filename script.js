import { db } from "./firebase.js";
import { collection, addDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// کسٹمائزیشن پیج پر "میسج سینڈ کریں" بٹن کا ایونٹ ہینڈلر
document.getElementById("generateButton")?.addEventListener("click", async function () {
  const sender = document.getElementById("senderName").value.trim();
  const recipient = document.getElementById("recipientName").value.trim();
  const relation = document.getElementById("relation").value;
  if (sender === "" || recipient === "") {
    alert("براہ کرم دونوں نام درج کریں!");
    return;
  }
  try {
    // Firebase Firestore میں ڈیٹا سیو کریں
    const docRef = await addDoc(collection(db, "eidGreetings"), {
      sender: sender,
      recipient: recipient,
      relation: relation,
      timestamp: new Date()
    });
    // نیا لنک جنریٹ کریں اور فائنل پیج پر ری ڈائریکٹ کریں
    window.location.href = `generated-link.html?id=${docRef.id}`;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});

// فائنل پیج پر ڈیٹا لوڈ کرنے کا فنکشن
async function loadGeneratedMessage() {
  const params = new URLSearchParams(window.location.search);
  const docId = params.get("id");
  if (docId) {
    const docRef = doc(db, "eidGreetings", docId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // کسٹمائزڈ میسج تیار کریں
        document.getElementById("finalMessage").innerHTML =
          `عید مبارک<br>میرے پیارے ${data.relation} کو<br>${data.recipient} کی طرف سے<br>${data.sender} کی طرف سے عید الفطر مبارک ہو!`;
        // یونیک لنک تیار کریں
        const newLink = `${window.location.origin}/generated-link.html?id=${docId}`;
        document.getElementById("generatedLink").value = newLink;
        document.getElementById("linkContainer").style.display = "block";
      } else {
        document.getElementById("finalMessage").innerText = "کوئی ڈیٹا نہیں ملا!";
      }
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  }
}
window.loadGeneratedMessage = loadGeneratedMessage;

// لنک کاپی کرنے کا فنکشن
window.copyLink = function() {
  const copyText = document.getElementById("generatedLink");
  copyText.select();
  document.execCommand("copy");
  alert("لنک کاپی ہو گیا!");
};
