function nextPage() {
    window.location.href = "message.html";
}

function convertToUrdu(name) {
    return name.replace(/a/g, 'ا').replace(/b/g, 'ب').replace(/c/g, 'ک').replace(/d/g, 'د')
               .replace(/e/g, 'ے').replace(/f/g, 'ف').replace(/g/g, 'گ').replace(/h/g, 'ح')
               .replace(/i/g, 'ی').replace(/j/g, 'ج').replace(/k/g, 'ک').replace(/l/g, 'ل')
               .replace(/m/g, 'م').replace(/n/g, 'ن').replace(/o/g, 'و').replace(/p/g, 'پ')
               .replace(/q/g, 'ق').replace(/r/g, 'ر').replace(/s/g, 'س').replace(/t/g, 'ت')
               .replace(/u/g, 'و').replace(/v/g, 'و').replace(/w/g, 'و').replace(/x/g, 'کس')
               .replace(/y/g, 'ی').replace(/z/g, 'ز');
}

function generateMessage() {
    var name = document.getElementById("friendName").value.trim();
    var relation = document.getElementById("relation").value;

    if (name === "") {
        alert("براہ کرم نام درج کریں!");
        return;
    }

    var urduName = convertToUrdu(name);

    var message = {
        name: `عید مبارک ${urduName}`,
        greeting: `کی طرف سے میرے پیارے ${relation} کو عید الفطر مبارک ہو!`
    };

    localStorage.setItem("finalMessage", JSON.stringify(message));
    window.location.href = "message.html";
}

window.onload = function() {
    var finalMessage = localStorage.getItem("finalMessage");
    if (finalMessage) {
        var msg = JSON.parse(finalMessage);
        document.getElementById("nameMessage").innerText = msg.name;
        setTimeout(() => {
            document.getElementById("greetingMessage").innerText = msg.greeting;
        }, 2000);
    }
};

// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to Generate and Save Link
document.getElementById("shareButton").addEventListener("click", function() {
    let eidMessage = document.getElementById("eidMessage").innerText;
    let newDocRef = db.collection("eidMessages").doc(); 
    let generatedLink = window.location.origin + "/send.html?id=" + newDocRef.id;

    newDocRef.set({ message: eidMessage })
    .then(() => {
        window.location.href = generatedLink; 
    })
    .catch(error => console.error("Error saving message: ", error));
});

// Copy Link Function
document.getElementById("copyLinkButton").addEventListener("click", function() {
    let copyText = document.getElementById("generatedLink");
    copyText.select();
    document.execCommand("copy");
    alert("لنک کاپی ہو گیا!");
});
