const play = document.getElementById("play");
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
const gameBox = document.getElementById("gameBox");
const backButton = document.getElementById("backButton");
const mainStartingContent = document.getElementById("mainStartingContent");
const scoreText = document.getElementById("scoreText");
const speedText = document.getElementById("speedText");

const rounds = document.querySelectorAll(".round");
const gameArea9x9 = document.getElementById("gameArea9x9");
const lunars = document.querySelectorAll(".lunar");
const score = document.querySelector("#score");
const speed = document.querySelector("#speed");

musicButton.onmousedown = () => {
  music.src = "https://www.youtube.com/embed/EQmIBHObtCs?autoplay=1";
};
musicButton.onmouseover = () => {
  music.src = "";
};
play.onclick = () => {
  music.src = "https://www.youtube.com/embed/EQmIBHObtCs?autoplay=1";
  mainStartingContent.style.display = "none";
  backButton.style.display = "block";
  scoreText.style.display = "block";
  speedText.style.display = "block";
  gameArea9x9.style.display = "flex";
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundImage = "url(./res/img/background.jpg)";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed";
};
backButton.onclick = () => {
  music.src = "";
  mainStartingContent.style.display = "flex";
  backButton.style.display = "none";
  scoreText.style.display = "none";
  speedText.style.display = "none";
  gameArea9x9.style.display = "none";
  document.body.style.backgroundRepeat = "";
  document.body.style.backgroundSize = "";
  document.body.style.backgroundAttachment = "";
  document.body.style.backgroundImage = "url(./res/img/background.gif)";
};

let result = 0;
let strikePosi;
let timerId = 0;

function randomRound() {
  [...rounds].forEach((round) => {
    round.classList.remove("lunar");
  });

  const randomRound = rounds[Math.floor(Math.random() * 6)];
  randomRound.classList.add("lunar");

  strikePosi = randomRound.id;
}

[...rounds].forEach((round) => {
  round.addEventListener("click", (k) => {
    console.log(k);

    if (round.id == strikePosi) {
      result += 10;
      score.innerHTML = result + " pts";
      strikePosi = 0;
    }
    if (result >= 510) {
      alert(
        "You reached score 500, so now, if you want to play again click on 'ok' and if you want to change speed (difficulty) you must reload the page."
      );
      mainStartingContent.style.display = "flex";
      backButton.style.display = "none";
      scoreText.style.display = "none";
      speedText.style.display = "none";
      gameArea9x9.style.display = "none";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundImage = "url(./res/img/background.gif)";
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
  alert(
    "this game has a random speed, so sometimes you can have slow speed or fast speed of a lunar."
  );
};

function moveLunar() {
  timerId = setInterval(randomRound, randomLimit);
}

moveLunar();
