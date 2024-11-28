let rocks = [];
let rover;
let points;
let pointsElement;
let time;
let remainingTime;
let gameIntervalId;
let timerIntervalId;

document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.querySelector("#splash-screen");
  splashScreen.style.position = "fixed";
  splashScreen.style.top = "0";
  splashScreen.style.left = "0";
  splashScreen.style.width = "100%";
  splashScreen.style.height = "100%";
  splashScreen.style.backgroundImage = 'url("images/fondo.jpeg")';
  splashScreen.style.backgroundSize = "cover";
  splashScreen.style.backgroundPosition = "center";
  splashScreen.style.zIndex = "-1";

  const gameScreen = document.querySelector("#game-screen");
  gameScreen.style.display = "none";

  const gameOverScreen = document.querySelector("#game-over-screen");
  gameOverScreen.style.display = "none";

  time = document.querySelector("#game-time");
  pointsElement = document.querySelector("#game-points");

  document.querySelector("#start-btn").addEventListener("click", startGame);
  document.querySelector('#restart-btn').addEventListener('click', startGame);

  window.gameBoxNode = document.querySelector("#game-box");
  rover = new Rover();
  document.querySelector('body').addEventListener('keypress', (e) => {
    if (e.key == 'd') {
      rover.moveRight()
    } else if (e.key == 'a') {
      rover.moveLeft();
    }
  });
});

/**
 * Inicia el juego.
 */
function startGame() {
  document.querySelector("#start-btn").style.display = "none";
  document.querySelector("#splash-title").style.display = "none";
  document.querySelector("#game-screen").style.display = "block";
  document.querySelector("#game-over-screen").style.display = "none";

  const rocaImages = ["roca-1.png", "roca-2.png", "roca-3.png", "roca-4.png", "roca-5.png", "roca-6.png", "roca-7.png"];
  rocks = [];
  points = 0;
  for (let i = 0; i < rocaImages.length; i++) {
    let xPosition = 250 + Math.random() * (window.innerWidth - 400);
    let yPosition = Math.random() * -500;
    let roca = new Roca(rocaImages[i], xPosition, yPosition);
    rocks.push(roca);
  }

  remainingTime = 60;

  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));

  timerIntervalId = setInterval(() => {
    updateTimer();
  }, 1000);
}

/**
 * Actualiza el temporizador.
 */
function updateTimer() {
  remainingTime--;
  time.textContent = `Remaining Time: ${remainingTime}`;
  
  if (remainingTime <= 0) {
    const gamerOverSound = new Audio('sounds/game-over.mp3');
    gamerOverSound.play();
    clearInterval(gameIntervalId);
    clearInterval(timerIntervalId);
    document.querySelector("#game-over-screen").style.display = "block";
    document.querySelector("#game-screen").style.display = "none";

    document.querySelectorAll('.roca').forEach((roca) => {
      roca.remove();
    });
  }
}

/**
 * Loop del juego.
 */
function gameLoop() {
  rocks.forEach((rock) => {
    rock.move();

    if (checkCollision(rock, rover)) {
      console.log("Colisión detectada!");
    }
  });

  if (rover.x >= window.innerWidth - rover.w - 50) {
    rover.successSound.play();
    points += 100;
    pointsElement.textContent = `Points: ${points}`;
    clearInterval(gameIntervalId);
  }
}

/**
 * Verifica si hay colisión entre la roca y el rover.
 * 
 * @param {*} rock Roca
 * @param {*} rover Rover
 * @returns 
 */
function checkCollision(rock, rover) {
  const rocaRect = rock.node.getBoundingClientRect();
  const roverRect = rover.node.getBoundingClientRect();

  return !(
    rocaRect.top > roverRect.bottom ||
    rocaRect.bottom < roverRect.top ||
    rocaRect.right < roverRect.left ||
    rocaRect.left > roverRect.right
  );
}
