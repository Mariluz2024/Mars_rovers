class Roca {
    constructor(nombreArchivoRoca, x, y) {
      this.node = document.createElement("img");
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
    }
  
    mover() {
      this.x -= this.speed;
      this.node.style.left = `${this.x}px`;
    }
  }