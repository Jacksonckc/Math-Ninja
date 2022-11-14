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
    this.velocity = Vector(vx, vy); // TODO


    // if (Math.random() > 0.5) {
    //   this.x = canvasWidth * Math.random();
    //   this.y = Math.random() > 0.5 ? -TARGET_SIZE : canvaseHeight;
    // } else {
    //   this.x = Math.random() > 0.5 ? -TARGET_SIZE : canvasWidth;
    //   this.y = canvaseHeight * Math.random();
    // }
    
    // q1 m=+ v=- (-x -y)
    // q2 m=- v=+ (+x -y)
    // q3 m=+ v=+ (+x +y)
    // q4 m=- v=- (-x +y)

    // -x when x > 0
    // -y when y > 0

//     const negativeX = this.x > (canvasWidth / 2) ? -1 : 1;
//     const negativeY = this.y > (canvasHeight / 2) ? -1 : 1;
//     const rise = Math.random() * 100; // Todo
//     const run = Math.random() * 100; // Todo
//     const hyp = Math.sqrt((rise**2) + (run**2))
// ;
//     // Distance moved per tick (px over ms)
//     this.deltaX = ((speed / hyp) * run) * (negativeX)
//     this.deltaY = ((speed / hyp) * rise) * (negativeY)

//     this.active = false
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

    // https://github.com/Kaelinator/AGAD/blob/master/Fruit%20Ninja/Fruit.js
    // Update Position
    this.position.add(this.velocity);

    // Update Velocity
    this.velocity.x *= 0.99;
    this.velocity.y += GRAVITY;



    //const GRAVITY = 1; // TODO
    //this.vy -= GRAVITY; // TODO

    // Move according to velocity
    // this.x += this.deltaX * deltaTime;  
    // this.y += this.deltaY * deltaTime;
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