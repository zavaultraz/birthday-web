const audio = document.getElementById("bgAudio");
const muteBtn = document.getElementById("muteBtn");

let hasPlayed = false;

window.addEventListener("scroll", () => {
    if (!hasPlayed) {
        audio.play().catch(err => console.log(err));
        hasPlayed = true;
    }
});

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

allowBtn.addEventListener("click", () => {
    audio.muted = false;
    audio.volume = 1;
    audio.play();
    popup.style.display = "none";
});

denyBtn.addEventListener("click", () => {
    audio.muted = true;
    audio.play();
    popup.style.display = "none";
});
