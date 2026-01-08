const audio = document.getElementById("bgAudio");
const muteBtn = document.getElementById("muteBtn");

let hasPlayed = false;

// ▶️ PLAY AUDIO SAAT SCROLL PERTAMA
window.addEventListener("scroll", () => {
    if (!hasPlayed) {
        audio.play().catch(err => console.log(err));
        hasPlayed = true;
    }
});

// 🔇🔊 TOGGLE MUTE
muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;

    if (audio.muted) {
        muteBtn.textContent = "🔇";
    } else {
        muteBtn.textContent = "🔊";
    }
});

const popup = document.getElementById("experiencePopup");

const allowBtn = document.getElementById("allowSound");
const denyBtn = document.getElementById("denySound");

// ALLOW → PLAY & UNMUTE
allowBtn.addEventListener("click", () => {
    audio.muted = false;
    audio.volume = 1;
    audio.play();
    popup.style.display = "none";
});

// DENY → PLAY MUTED / ATAU TIDAK PLAY
denyBtn.addEventListener("click", () => {
    audio.muted = true;
    audio.play(); // optional, boleh dihapus
    popup.style.display = "none";
});
