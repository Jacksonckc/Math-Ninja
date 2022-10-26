class Target {
  constructor(value, isCorrectAnswer) {
    this.value = value;
    this.correct = isCorrectAnswer;
    this.color = "THIS SHOULD BE RANDOM"; // TODO

    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  draw(ctx) {
    // Draw text to screen
    ctx.fillText(this.value, is.x, this.y)
  }

  tick() {
    const GRAVITY = 1; // TODO
    this.vy -= GRAVITY; // TODO

    // Move according to velocity
    this.x += this.vx;
    this.y += this.vy;
  }

  onClick() {
    console.log("Implement onClick in Target");
  }

  clicked() {
    return this.correct;
  }
}