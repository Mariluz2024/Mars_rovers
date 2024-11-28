class Rover {
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

    this.gravitySpeed = 2;
    this.jumpSpeed = 170;

    this.successSound = new Audio('sounds/success.mp3');
  }

  /**
   * Hace mover el rover hacia la derecha.
   */
  moveRight() {
    this.x += 6;
    this.node.style.left = `${this.x}px`;
  }

  /**
   * Hace mover el rover hacia la izquierda.
   */
  moveLeft() {
    this.x -= 6;
    this.node.style.left = `${this.x}px`;
  }
  }