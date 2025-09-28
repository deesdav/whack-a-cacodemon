const play = document.getElementById("play");
const info = document.getElementById("info");
const infoContent = document.getElementById("infoContent");
const molePlay = document.getElementById("molePlay");
const music = document.getElementById("music");
const audioBtn = document.getElementById("audioBtn");
const gameBox = document.getElementById("gameBox");
const backButton = document.getElementById("backButton");
const mainStartingContent = document.getElementById("mainStartingContent");
const scoreText = document.getElementById("scoreText");
const speedText = document.getElementById("speedText");
const rounds = document.querySelectorAll(".round");
const gameArea9x9 = document.getElementById("gameArea9x9");
const cacos = document.querySelectorAll(".caco");
const score = document.querySelector("#score");
const speed = document.querySelector("#speed");
const timerText = document.getElementById("timerText");
const timerSpan = document.getElementById("timer");
const audio = new Audio('./res/audio/doom_soundtrack.mp3');

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function playAudio() {
  audio.play();
  audio.loop = true;
}

function toggleMute() {
  if (audio.muted) {
    audio.muted = false;
  } else {
    audio.muted = true;
  }
}

function toggleUnMute() {
  audio.muted = !audio.muted;
}

audioBtn.onclick = () => {
  playAudio();
  if (audioBtn.innerText == "AUDIO ON") {
    toggleMute();
    audioBtn.innerText = "AUDIO OFF";
  } else if (audioBtn.innerText == "AUDIO OFF") {
    toggleUnMute();
    audioBtn.innerText = "AUDIO ON";
  }
}

info.onclick = () => {
  backButton.style.display = "block";
  infoContent.style.display = "block";
  info.style.display = "none";
}

let timeLeft = 30;
let timerInterval = null;

function startTimer() {
  timeLeft = 30;
  timerSpan.innerText = timeLeft;
  timerText.style.display = "block";
  timerInterval = setInterval(() => {
    timeLeft--;
    timerSpan.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(timerId);
      alert("Time's up! Your score: " + result + " pts");
      mainStartingContent.style.display = "flex";
      backButton.style.display = "none";
      scoreText.style.display = "none";
      speedText.style.display = "none";
      timerText.style.display = "none";
      gameArea9x9.style.display = "none";
      document.body.style.backgroundSize = "65%";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundImage = "url(./res/img/background.gif)";
      document.body.style.transition = "0s";
      result = 0;
      score.innerHTML = result + " pts";
      music.src = "";
    }
  }, 1000);
}

play.onclick = () => {
  playAudio();
  mainStartingContent.style.display = "none";
  backButton.style.display = "block";
  scoreText.style.display = "block";
  speedText.style.display = "block";
  gameArea9x9.style.display = "flex";
  document.body.style.backgroundImage = "url(./res/img/gameBackground.gif)";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.transition = ".5s all";
  startTimer();
};
backButton.onclick = () => {
  music.src = "";
  mainStartingContent.style.display = "flex";
  backButton.style.display = "none";
  scoreText.style.display = "none";
  speedText.style.display = "none";
  gameArea9x9.style.display = "none";
  document.body.style.backgroundSize = "65%";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundImage = "url(./res/img/background.gif)";
  document.body.style.transition = "0s";
  infoContent.style.display = "none";
  timerText.style.display = "none";
  info.style.display = "block";
  clearInterval(timerInterval);
  location.reload();
};

let result = 0;
let strikePosi;
let timerId = 0;

function randomRound() {
  [...rounds].forEach((round) => {
    round.classList.remove("caco");
  });

  const randomRound = rounds[Math.floor(Math.random() * 9)];
  randomRound.classList.add("caco");

  strikePosi = randomRound.id;
}

[...rounds].forEach((round) => {
  const eventType = isTouchDevice() ? "touchstart" : "click";
  round.addEventListener(eventType, (k) => {
    console.log(k);

    if (round.id == strikePosi) {
      result += 10;
      score.innerHTML = result + " pts";
      strikePosi = 0;
    }
    if (result >= 310) {
      alert(
        "You reached score 300, so now, if you want to play again click on 'ok' and if you want to change speed (difficulty) you must reload the page."
      );
      mainStartingContent.style.display = "flex";
      backButton.style.display = "none";
      scoreText.style.display = "none";
      speedText.style.display = "none";
      gameArea9x9.style.display = "none";
      document.body.style.backgroundSize = "65%";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundImage = "url(./res/img/background.gif)";
      document.body.style.transition = "0s";
      result -= 510;
      score.innerHTML = result + " pts";
      music.src = "";
    }
  });
});

const randomLimit = Math.floor(Math.random() * (250, 600) + 150);

let resultSpeed = 0;
resultSpeed = randomLimit;
speed.innerHTML = randomLimit + " ms";

window.onload = () => {
  console.log(randomLimit);
};

function movecaco() {
  timerId = setInterval(randomRound, randomLimit);
}
movecaco();

const crucibleCursor = document.getElementById('crucible-cursor');
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let targetX = cursorX;
let targetY = cursorY;
let angle = 0;
let rotating = false;

function animateCursor() {
  cursorX += (targetX - cursorX) * 0.25;
  cursorY += (targetY - cursorY) * 0.25;
  crucibleCursor.style.transform = `translate3d(${cursorX - 32}px, ${cursorY - 32}px, 0) rotate(${angle}deg)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

window.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});
window.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    targetX = e.touches[0].clientX;
    targetY = e.touches[0].clientY;
  }
});

function rotateCursor() {
  if (rotating) return;
  rotating = true;
  angle = 45;
  crucibleCursor.style.transition = 'transform 0.15s cubic-bezier(.4,2,.6,1)';
  setTimeout(() => {
    angle = 0;
    crucibleCursor.style.transition = 'transform 0.25s cubic-bezier(.4,2,.6,1)';
    rotating = false;
  }, 120);
}
window.addEventListener('mousedown', rotateCursor);
window.addEventListener('touchstart', rotateCursor);