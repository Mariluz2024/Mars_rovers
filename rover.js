/**
 * Representa el objeto Rover.
 */
class Rover {
  /**
   * Constructor de la clase Rover.
   */
  constructor() {
    this.node = document.createElement("img");
    this.node.src = "images/rover.png";

    gameBoxNode.append(this.node);

    this.x = 50;
    this.y = 240;
    this.w = 128;
    this.h = 128;

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    this.node.style.position = "absolute";

    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.speed = 6;

    this.successSound = new Audio('sounds/success.mp3');
  }

  /**
   * Hace mover el rover hacia la derecha.
   */
  moveRight() {
    this.x += this.speed;

    if (this.x >= window.innerWidth - this.w - 100) {
      this.x = window.innerWidth - this.w - 100;
    }

    this.node.style.left = `${this.x}px`;
  }

  /**
   * Hace mover el rover hacia la izquierda.
   */
  moveLeft() {
    this.x -= this.speed;
    this.node.style.left = `${this.x}px`;
  }

  /**
   * Hace que el rover regrese a su posición inicial.
   */
  backToInitialPosition() {
    this.x = 50;
    this.node.style.left = `${this.x}px`;
  }

  /**
   * Aumenta la velocidad del rover.
   */
  increaseSpeed() {
    this.speed += 1;
  }
}
