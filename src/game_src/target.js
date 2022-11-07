class Target {
  constructor(value, isCorrectAnswer) {
    this.value = value;
    this.correct = isCorrectAnswer;
    this.color = "THIS SHOULD BE RANDOM"; // TODO

    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;

    this.active = false;
  }

  draw(ctx) {
    // Draw text to screen
    ctx.fillText(this.value, is.x, this.y)
  }

  tick() {
    if (!active) return;
    
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

  draw() {
    return
  }

  start() {
    this.active = true;
  }
}