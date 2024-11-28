
//clase que representa una roca en el juego
class Roca {
  constructor(nombreArchivoRoca, x, y) {
    this.nombreArchivoRoca = nombreArchivoRoca;
    this.node = document.createElement("img");
    this.node.classList.add("roca");
    this.node.src = `images/${nombreArchivoRoca}`;

    gameBoxNode.append(this.node);

    this.x = x;
    this.y = y;
    this.w = 48;
    this.h = 48;

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    this.node.style.position = "absolute";

    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.speed = 2;

    const random = Math.random();

    if (random < 0.33) {
      this.impactSound = new Audio('sounds/impact.mp3');
    } else if (random < 0.66) {
      this.impactSound = new Audio('sounds/impact-2.mp3');
    } else {
      this.impactSound = new Audio('sounds/impact-3.mp3');
    }
  }

  /**
   * Mueve la roca hacia abajo.
   */
  move() {
    this.y += this.speed;

    if (this.y >= 320) {
      this.node.src = "images/explosion.png";
      this.impactSound.play();
      setTimeout(() => {
        this.node.src = `images/${this.nombreArchivoRoca}`;
        this.y = Math.random() * -500;
      }, 500);
      return;
    }

    this.node.style.top = `${this.y}px`;
  }
  }