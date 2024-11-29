let rocks = [];
let rover;
let points;
let pointsElement;
let time;
let remainingTime;
let gameIntervalId;
let timerIntervalId;
let gameOverScreen;
let gameScreen;
let startButton;
let restartButton;
let level;

/**
 * Inicializa el juego.
 */
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

  gameScreen = document.querySelector("#game-screen");
  gameScreen.style.display = "none";

  gameOverScreen = document.querySelector("#game-over-screen");
  gameOverScreen.style.display = "none";

  time = document.querySelector("#game-time");
  pointsElement = document.querySelector("#game-points");

  startButton = document.querySelector("#start-btn");
  startButton.addEventListener("click", startGame);

  restartButton = document.querySelector("#restart-btn");
  restartButton.addEventListener("click", startGame);

  window.gameBoxNode = document.querySelector("#game-box");
  rover = new Rover();

  document.querySelector("body").addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
      rover.moveRight();
    } else if (e.key == "ArrowLeft") {
      rover.moveLeft();
    }
  });
});

/**
 * Inicia el juego.
 */
function startGame() {
  startButton.style.display = "none";
  document.querySelector("#splash-title").style.display = "none";
  gameScreen.style.display = "block";
  gameOverScreen.style.display = "none";

  level = 2;
  loadRocks(level);

  remainingTime = 60;
  points = 0;

  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); // 60 fps

  timerIntervalId = setInterval(() => {
    updateTimer();
  }, 1000);
}

/**
 * Carga las rocas en el juego.
 */
function loadRocks(speed) {
  removeRocks();

  const rocaImages = [
    "roca-1.png",
    "roca-2.png",
    "roca-3.png",
    "roca-4.png",
    "roca-5.png",
    "roca-6.png",
    "roca-7.png",
  ];
  rocks = [];
  for (let i = 0; i < rocaImages.length; i++) {
    let xPosition = 250 + Math.random() * (window.innerWidth - 400);
    let yPosition = Math.random() * -500;
    let roca = new Roca(rocaImages[i], xPosition, yPosition, speed);
    rocks.push(roca);
  }
}

/**
 * Elimina las rocas del juego.
 */
function removeRocks() {
  document.querySelectorAll(".roca").forEach((roca) => {
    roca.remove();
  });
}

/**
 * Actualiza el temporizador.
 */
function updateTimer() {
  remainingTime--;
  time.textContent = `Remaining Time: ${remainingTime}`;

  if (remainingTime <= 0) {
    gameOver();
  }
}

/**
 * Muestra la pantalla de game over.
 */
function gameOver(colission) {
  const gamerOverSound = new Audio("sounds/game-over.mp3");
  gamerOverSound.play();
  clearInterval(gameIntervalId);
  clearInterval(timerIntervalId);
  gameOverScreen.style.display = "block";
  gameScreen.style.display = "none";

  level = 2;

  points = 0;
  pointsElement.textContent = `Points: ${points}`;

  rover.speed = 6;
  remainingTime = 60;

  if (colission) {
    const explosion = document.createElement("img");
    explosion.src = "images/explosion.png";
    explosion.style.position = "absolute";
    explosion.style.width = "128px";
    explosion.style.height = "128px";
    explosion.style.top = `${rover.y}px`;
    explosion.style.left = `${rover.x}px`;
    gameOverScreen.append(explosion);

    setTimeout(() => {
      explosion.remove();
      rover.backToInitialPosition();
    }, 3000);
  }

  document.querySelectorAll(".roca").forEach((roca) => {
    roca.remove();
  });
}

/**
Loop del juego.
 */
function gameLoop() {
  rocks.forEach((rock) => {
    rock.move();

    if (checkCollision(rock, rover)) {
      gameOver(true);
    }
  });

  if (rover.x >= window.innerWidth - rover.w - 100) {
    rover.successSound.play();
    points += 100;
    pointsElement.textContent = `Points: ${points}`;
    clearInterval(gameIntervalId);

    rover.backToInitialPosition();

    removeRocks();

    setTimeout(() => {
      level++;
      loadRocks(level);
      rover.increaseSpeed();
      remainingTime += 30;
      gameIntervalId = setInterval(() => {
        gameLoop();
      }, Math.round(1000 / 60));
    }, 1000);
  }
}

/*Verifica si hay colisión entre la roca y el rover*/

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
