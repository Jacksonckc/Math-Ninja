const canvas = document.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 400;
      canvas.height = 500;
      // const image = new Image();
      // image.src = '../boom/boom.png';
      // console.log(image);
      let x = 0;
      let frame = 0;
      const frameIncrementSpeed = 4;
      let lastTime = 0;
      const animate = (timestamp) => {
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        console.log(deltaTime);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.drawImage(image, frame * 200, 0, 200, 179, x, 10, 100, 100);
        ctx.fillText('1', x, 50);
        ctx.fillText('2', x, 100);
        ctx.fillText('3', x, 150);
        ctx.fillText('4', x, 200);
        ctx.font = "30px Arial";
        update();
        requestAnimationFrame(animate);
      };



      const update = () => {
        if (x > canvas.width) {
          x = 0 - 100;
        } else {
          x++;
        }
        if (x % frameIncrementSpeed == 0) {
          if (frame > 5) {
            frame = 0;
          } else {
            frame++;
          }
        }
      };

      animate(0);

        var c = document.getElementById("canvas");
        var ctx2 = c.getContext("2d");
        var ball = { 
      radius:50,
      x:200,
      y:150,
      color:"#00F",
      draw:function() {
        var arcStartAngle=0;
        var arcEndAngle=2*Math.PI;

        ctx.fillStyle=this.color
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,arcStartAngle,arcEndAngle);
        ctx.fill();
      }
 }
ball.draw();