<<<<<<< HEAD
import { amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from "@mui/material/colors";

class Target {
  colorArray = [amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow]
  constructor(value, isCorrectAnswer, speed, canvasWidth, canvaseHeight) {
    const TARGET_SIZE = 10; // TODO

=======
export class Target {
  constructor(value, isCorrectAnswer) {
>>>>>>> 532666658cae93ef0a9bec6d73699a017ae8429b
    this.value = value;
    this.correct = isCorrectAnswer;
    this.color = this.colorArray[Math.floor(Math.random()*this.colorArray.length)];

<<<<<<< HEAD
    if (Math.random() > 0.5) {
      this.x = canvasWidth * Math.random();
      this.y = Math.random() > 0.5 ? -TARGET_SIZE : canvaseHeight;
    } else {
      this.x = Math.random() > 0.5 ? -TARGET_SIZE : canvasWidth;
      this.y = canvaseHeight * Math.random();
    }
    

    this.m = m; // TODO
    this.b = b; // TODO
    this.v = speed;

    this.active = false
=======
    this.x = 100;
    this.y = 100;
    this.vx = 0;
    this.vy = 0;

    this.active = false;
>>>>>>> 532666658cae93ef0a9bec6d73699a017ae8429b
  }

  draw(ctx) {
    // Draw text to screen
<<<<<<< HEAD
    if (!this.active) return;
    ctx.fillText(this.value, this.x, this.y)
  }

  tick(timestamp) {
    if (!this.active) return;
    const deltaTime = timestamp - this.lastUpdate;
    this.lastUpdate = timestamp
    //const GRAVITY = 1; // TODO
    //this.vy -= GRAVITY; // TODO
=======
    ctx.fillText(this.value.toString(), this.x, this.y)
  }

  tick() {
    if (!(this.active)) return;
    
    const GRAVITY = 1; // TODO
    this.vy -= GRAVITY; // TODO
>>>>>>> 532666658cae93ef0a9bec6d73699a017ae8429b

    // Move according to velocity
    this.x += this.vx;  
    this.y += this.vy;
  }

  onClick() {
    if (!this.active) return;
    console.log("Implement onClick in Target");
    return this.correct;
  }

<<<<<<< HEAD
  start(timestamp) {
    this.lastUpdate = timestamp;
=======
  start() {
>>>>>>> 532666658cae93ef0a9bec6d73699a017ae8429b
    this.active = true;
  }
}