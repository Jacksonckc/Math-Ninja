import RandomParticle from "./randomParticle";

export class Blade {
  constructor() {
    this.swipes = [];
  }

  update() {
    this.swipes.shift();
    // if (this.swipes.length > 10) {
    //   this.swipes.shift();
    // } else if (this.swipes.length > 0) {
    //   this.swipes.shift();
    // }
  }

  checkForSlice(target, x, y, score, playerLives) {
    if (target.isWithinHitBox(x, y) && target.isCorrect() === true) {
      score.current = score.current + 1;
      target.kill();
      return true;
    } else if (target.isWithinHitBox(x, y) && target.isCorrect() === false) {
      //decrease score here
      playerLives.current = playerLives.current - 1;
      target.kill();
      return false;
    }
  }

  draw(ctx) {
    var length = this.swipes.length;

    for (var i = 0; i < length; i++) {
      ctx.beginPath();
      ctx.arc(this.swipes[i].x, this.swipes[i].y, 5, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = this.swipes[i].color;
      ctx.fill();
    }
  }

  swing(x, y, isSwinging) {
    if (isSwinging) {
      this.color = "yellow";
    } else {
      this.color = "white";
    }
    var vector = new RandomParticle(x, y, this.color);
    this.swipes.push(vector);
  }
}
