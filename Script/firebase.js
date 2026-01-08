import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    // CONFIG
    const firebaseConfig = {
        apiKey: "AIzaSyBPTaROKUU8Qbx-f-H1lszUoQIdmkussq4",
        authDomain: "game-garage-8qj86.firebaseapp.com",
        projectId: "game-garage-8qj86",
        storageBucket: "game-garage-8qj86.firebasestorage.app",
        messagingSenderId: "622612048115",
        appId: "1:622612048115:web:eda591ebf27ae31fd16f86"
    };

    // INIT
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // ELEMENTS
    const rsvpForm = document.getElementById("rsvpForm");
    const messagesGrid = document.getElementById("messagesGrid");
    const successMessage = document.getElementById("successMessage");

    // SUBMIT RSVP
    rsvpForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const message = document.getElementById("message").value;
        const attending = document.getElementById("attending").value;

        await addDoc(collection(db, "rsvpMessages"), {
            name,
            message,
            attending,
            createdAt: serverTimestamp()
        });

        successMessage.style.display = "block";
        rsvpForm.reset();

        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);
    });

    // REALTIME LISTENER
    const q = query(
        collection(db, "rsvpMessages"),
        orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
        messagesGrid.innerHTML = "";

        snapshot.forEach((doc) => {
            const data = doc.data();

            messagesGrid.innerHTML += `
                <div class="message-card">
                    <h3>${data.name}</h3>
                    <p>${data.message}</p>
                    <span class="attending ${data.attending}">
                        ${data.attending === "yes" ? "🏁 Attending" :
                          data.attending === "maybe" ? "❓ Maybe" : "❌ Not Attending"}
                    </span>
                </div>
            `;
        });
    });

});
