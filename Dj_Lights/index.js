const lights = document.querySelector(".lights");
const Btn = document.querySelector(".Start");
const bgMusic = document.getElementById("bg-music");

function getRandomColor() {
    const val1 = Math.floor(Math.random() * 256);
    const val2 = Math.floor(Math.random() * 256);
    const val3 = Math.floor(Math.random() * 256);
    return `rgb(${val1}, ${val2}, ${val3})`;
}

function magic() {
    Array.from(lights.children).forEach((e) => {
        e.style.backgroundColor = getRandomColor();
        e.style.color = getRandomColor();
    });
}
lights.style.display = "none"; 
let intervalId; 
let isPartyOn = false; 

Btn.addEventListener("click", () => {
    if (!isPartyOn) {
        magic();
        bgMusic.play();
        lights.style.display = "flex"; 
        Btn.textContent = "End Party";
        if (!intervalId) {
            intervalId = setInterval(magic, 1000);
        }
    } else {
        // End party
        bgMusic.pause();
        bgMusic.currentTime = 0; 
        lights.style.display = "none"; 
        Btn.textContent = "Start Party"; 
        clearInterval(intervalId); 
        intervalId = null; 
    }
    isPartyOn = !isPartyOn;
});
