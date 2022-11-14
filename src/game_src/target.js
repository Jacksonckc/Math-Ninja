import { amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from "@mui/material/colors";
import Vector from "vector.js"; 


GRAVITY = 0.5;

export class Target {
  colorArray = [amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow]
  constructor(value, isCorrectAnswer, speed, canvasWidth, canvaseHeight) {
    const TARGET_SIZE = 10; // TODO

    this.value = value;
    this.correct = isCorrectAnswer;
    this.color = this.colorArray[Math.floor(Math.random()*this.colorArray.length)];

    this.position = Vector(Math.random()*canvasWidth, canvasHeight + TARGET_SIZE);
    this.velocity = Vector(vx, vy); // TODO Brandon

    this.active = false
  }

  draw(ctx) {
    // Draw text to screen
    if (!this.active) return;
    ctx.fillText(this.value, this.x, this.y)
  }

  tick(ctx, destroyCallback) {
    if (!this.active) return;

    // https://github.com/Kaelinator/AGAD/blob/master/Fruit%20Ninja/Fruit.js
    // Update Position
    this.position.add(this.velocity);

    // Update Velocity
    this.velocity.x *= 0.99;
    this.velocity.y += GRAVITY;


    // TODO if y is positive and off screen. destoryCallback(this, isCorrect()) // TODO Keaton
  }

  isCorrect() {
    if (!this.active) return;
    return this.correct;
  }

  start() {
    this.active = true;
  }
}