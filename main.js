let rocas = [];

document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.querySelector("#splash-screen");
  splashScreen.style.position = "fixed";
  splashScreen.style.top = "0";
  splashScreen.style.left = "0";
  splashScreen.style.width = "100%";
  splashScreen.style.height = "100%";
  splashScreen.style.backgroundImage = 'url("images/fondo.jpeg")'; // Replace with your image URL
  splashScreen.style.backgroundSize = "cover";
  splashScreen.style.backgroundPosition = "center";
  splashScreen.style.zIndex = "-1";

  const gameScreen = document.querySelector("#game-screen");
  gameScreen.style.display = "none";

  const gameOverScreen = document.querySelector("#game-over-screen");
  gameOverScreen.style.display = "none";

  document.querySelector("#start-btn").addEventListener("click", startGame);
});

function startGame() {
  document.querySelector("#start-btn").style.display = "none";
  document.querySelector("#splash-title").style.display = "none";

  document.querySelector("#game-screen").style.display = "block";

  window.gameBoxNode = document.querySelector("#game-box");
  const rover = new Rover();
  let roca = new Roca("roca-1.png", 650, 320);
  rocas.push(roca);
  roca = new Roca("roca-2.png", 850, 320);
  rocas.push(roca);

  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));
}

function gameLoop() {
  rocas.forEach((e) => {
    e.mover();
  });
}