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

  checkForSlice(target, x, y) {
    if (target.isWithinHitBox(x, y)) {
      return true;
    }
    
    return false;
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
