import { amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from "@mui/material/colors";

class Target {
  colorArray = [amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow]
  constructor(value, isCorrectAnswer, speed, canvasWidth, canvaseHeight) {
    const TARGET_SIZE = 10; // TODO

    this.value = value;
    this.correct = isCorrectAnswer;
    this.color = this.colorArray[Math.floor(Math.random()*this.colorArray.length)];

    if (Math.random() > 0.5) {
      this.x = canvasWidth * Math.random();
      this.y = Math.random() > 0.5 ? -TARGET_SIZE : canvaseHeight;
    } else {
      this.x = Math.random() > 0.5 ? -TARGET_SIZE : canvasWidth;
      this.y = canvaseHeight * Math.random();
    }
    

    this.m = 10; // TODO
    this.b = 10; // TODO
    this.v = speed;

    this.active = false
  }

  draw(ctx) {
    // Draw text to screen
    if (!this.active) return;
    ctx.fillText(this.value, this.x, this.y)
  }

  tick(timestamp) {
    if (!this.active) return;
    const deltaTime = timestamp - this.lastUpdate;
    this.lastUpdate = timestamp
    //const GRAVITY = 1; // TODO
    //this.vy -= GRAVITY; // TODO

    // Move according to velocity
    this.x += this.vx;  
    this.y += this.vy;
  }

  onClick() {
    if (!this.active) return;
    console.log("Implement onClick in Target");
    return this.correct;
  }

  start(timestamp) {
    this.lastUpdate = timestamp;
    this.active = true;
  }
}