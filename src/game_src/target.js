import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import Vector from "./vector.js";

const GRAVITY = 0.1;

export class Target {
  colorArray = [
    amber,
    blue,
    blueGrey,
    brown,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow,
  ];
  constructor(value, isCorrectAnswer, speed) {
    this.size = 10; // TODO

    this.value = value;
    this.correct = isCorrectAnswer;
    this.color =
      this.colorArray[Math.floor(Math.random() * this.colorArray.length)];

    this.speed = speed;

    this.active = false;
    this.hitBoxRadius = 100;
  }

  draw(ctx) {
    // Draw text to screen
    ctx.font = "bold 50px serif";
    ctx.fillStyle = "green";
    ctx.fillText(this.value, this.position.x, this.position.y);
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
    if (!this.active) return;
    return this.correct;
  }

  isWithinHitBox(mouseX, mouseY) {
    if (
      mouseX >= this.position.x - this.hitBoxRadius &&
      mouseX <= this.position.x + this.hitBoxRadius &&
      mouseY >= this.position.y - this.hitBoxRadius &&
      mouseY <= this.position.y + this.hitBoxRadius
    ) {
      console.log("WITHIN HITBOX " + this.value);
      if (this.isCorrect()) {
        return true;
      } else {
        return false;
      }
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
    this.active = false;
  }
}
