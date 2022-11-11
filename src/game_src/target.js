export class Target {
  constructor(value, isCorrectAnswer) {
    this.value = value;
    this.correct = isCorrectAnswer;
    this.color = "THIS SHOULD BE RANDOM"; // TODO

    this.x = 100;
    this.y = 100;
    this.vx = 0;
    this.vy = 0;

    this.active = false;
  }

  draw(ctx) {
    // Draw text to screen
    ctx.fillText(this.value.toString(), this.x, this.y)
  }

  tick() {
    if (!(this.active)) return;
    
    const GRAVITY = 1; // TODO
    this.vy -= GRAVITY; // TODO

    // Move according to velocity
    this.x += this.vx;
    this.y += this.vy;
  }

  onClick() {
    console.log("Implement onClick in Target");
    return this.correct;
  }

  start() {
    this.active = true;
  }
}