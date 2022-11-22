import { React, useEffect, useRef, useState } from "react";

function Game() {
  const canvasRef = useRef(null);
  var game_score = 0;
  var lives = 3;

  // draw game_score
  const drawScore = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "50px serif";
    ctx.fillText(`Score: ${game_score}`, 10, 50);
  };

  // draw heart
  const drawHeart = (ctx, color) => {
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#333";
    ctx.beginPath();
    ctx.moveTo(256, 111);
    ctx.bezierCurveTo(358, 26, 446, 201, 273, 335);
    ctx.moveTo(256, 111);
    ctx.bezierCurveTo(137, 38, 99, 258, 273, 333);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
  };

  const handleMouseDown = () => {
    game_score++;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      drawScore(context);
      drawHeart(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawScore]);

  return (
    <div>
      <canvas ref={canvasRef} onMouseDown={handleMouseDown} />
    </div>
  );
}

export default Game;
