import { React, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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

  const saveInfo = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const difficulty = localStorage.getItem("difficulty");
    const current_date = new Date();
    const datetime = `${current_date.getDate()}/${
      current_date.getMonth() + 1
    }/${current_date.getFullYear()}@${current_date.getHours()}:${current_date.getMinutes()}:${current_date.getSeconds()}`;

    // Get user at local storage
    const user_data = JSON.parse(localStorage.getItem("user"));

    const newgame = {
      timestamp: datetime,
      game_score: game_score,
      difficulty: difficulty,
    };

    const games =
      user_data.hasOwnProperty("games") === false
        ? [newgame]
        : [...user_data.games, newgame];

    const metadata = { ...user_data, games };

    localStorage.setItem("user", JSON.stringify(metadata));
  };

  const handleMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log(`X: ${offsetX}, Y: ${offsetY}`);
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
      <button type="button" onClick={saveInfo}>
        Save
      </button>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Game;
