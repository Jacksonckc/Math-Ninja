import Vector from "./vector.js";

const GRAVITY = 0.1;

export class Target {
  constructor(value, isCorrectAnswer, speed) {
    this.size = 10; // TODO

    this.value = value;
    this.correct = isCorrectAnswer;

    this.speed = speed;

    this.active = false;
    this.hitBoxRadius = 45;
    this.offsetX = 8;
    this.offsetY = 12;
  }

  draw(ctx) {
    if (this.value >= 1000) {
      this.offsetX = 35;
    } else if (this.value >= 100) {
      this.offsetX = 25;
    } else if (this.value >= 10) {
      this.offsetX = 18;
    }

    // Draw text to screen
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.hitBoxRadius,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#1e1e70";
    ctx.fill();
    ctx.font = "bold 35px serif";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText(
      this.value,
      this.position.x - this.offsetX,
      this.position.y + this.offsetY
    );
  }

  tick(ctx, destroyCallback) {
    if (!this.active) return;

    // https://github.com/Kaelinator/AGAD/blob/master/Fruit%20Ninja/Fruit.js
    // Update Position
    this.position.add(this.velocity);

    // Update Velocity
    this.velocity.x *= 0.99;
    this.velocity.y += GRAVITY;

    // We do not destroy if we have gone above the ceiling (y < 0) because
    // gravity will bring the target back on screen.
    if (
      this.velocity.y > 0 &&
      (this.position.x < 0 ||
        this.position.x > ctx.canvas.width ||
        /*ignore the ceiling*/ this.position.y > ctx.canvas.height)
    ) {
      destroyCallback(this);
      this.active = false;
    }

    this.draw(ctx);
  }

  isCorrect() {
    return this.correct;
  }

  isWithinHitBox(mouseX, mouseY) {
    if (
      mouseX >= this.position.x - this.hitBoxRadius &&
      mouseX <= this.position.x + this.hitBoxRadius &&
      mouseY >= this.position.y - this.hitBoxRadius &&
      mouseY <= this.position.y + this.hitBoxRadius
    ) {
      return true;
      // if (this.isCorrect()) {
      //   return true;
      // } else {
      //   return false;
      // }
    } else {
      return false;
    }
  }

  start(ctx) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    // Set a random starting position
    this.position = new Vector(
      Math.random() * canvasWidth,
      canvasHeight + this.size
    );

    const direction = this.position.x < canvasWidth / 2 ? 1 : -1;

    // Sets the velocity based on the speed parameter
    this.velocity = new Vector(
      Math.random() * this.speed * direction + 1 * direction,
      -Math.random() * 6 - 7
    );

    this.active = true;
  }

  kill() {
    const didKill = this.active;
    this.active = false;
    return didKill;
  }
}
