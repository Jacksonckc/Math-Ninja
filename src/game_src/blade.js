import Vector from "./vector.js";

export class Blade {
  constructor(color) {
    this.color = color;
    this.swipes = [];
  }

  update() {
    if (this.swipes.length > 20) {
      this.swipes.shift();
      this.swipes.shift();
    } else if (this.swipes.length > 0) {
      this.swipes.shift();
    }
  }

  checkForSlice(target, x, y, score, playerLives) {
    if (target.isWithinHitBox(x, y) && target.isCorrect() === true) {
      score.current = score.current + 1;
      target.kill();
    } else if (target.isWithinHitBox(x, y) && target.isCorrect() === false) {
      //decrease score here
      playerLives.current = playerLives.current - 1;
      target.kill();
    }
  }

  draw(ctx, isSwinging) {
    if (!isSwinging) return;
    var length = this.swipes.length;

    for (var i = 0; i < length; i++) {
      ctx.beginPath();
      ctx.arc(this.swipes[i].x, this.swipes[i].y, 5, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  swing(x, y) {
    var vector = new Vector(x, y);
    this.swipes.push(vector);
  }
}
