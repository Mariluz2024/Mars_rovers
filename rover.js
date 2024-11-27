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
      this.jumpSpeed = 35;
    }
  
    gravityEffect() {
      this.y += this.gravitySpeed;
      this.node.style.top = `${this.y}px`;
    }
  
    jump() {
      this.y -= this.jumpSpeed;
      this.node.style.top = `${this.y}px`;
    }
  }