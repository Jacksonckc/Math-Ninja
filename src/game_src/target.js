import { amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from "@mui/material/colors";
import Vector from "./vector.js"; 


const GRAVITY = 0.3;

export class Target {
  colorArray = [amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow]
  constructor(value, isCorrectAnswer, speed, canvasWidth, canvasHeight) {
    const TARGET_SIZE = 10; // TODO

    this.value = value;
    this.correct = isCorrectAnswer;
    this.color = this.colorArray[Math.floor(Math.random()*this.colorArray.length)];

    this.position = new Vector(Math.random()*canvasWidth, canvasHeight + TARGET_SIZE);
    this.velocity = new Vector(3, -7); // TODO Brandon

    this.active = false
  }

  draw(ctx) {
    // Draw text to screen
    //if (!this.active) return;
    ctx.fillText(this.value, this.position.x, this.position.y)
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
    if (this.velocity.y > 0 &&
        ((this.position.x < 0 || this.position.x > ctx.canvas.width) ||
        (/*ignore the ceiling*/  this.position.y > ctx.canvasHeight))) {
      destroyCallback(this);
      this.active = false;
    }

    this.draw(ctx);
  }

  isCorrect() {
    if (!this.active) return;
    return this.correct;
  }

  start() {
    this.active = true;
  }
}