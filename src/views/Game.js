import { React, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { spawn } from "../game_src/spawn.js";

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

    const [targets, setTargets] = React.useState([
      new Target(9, true, 30, 500, 500),
      new Target(3, false, 10, 500, 500),
      new Target(1, false, 25, 500, 500),
      new Target(7, false, 25, 500, 500),
      new Target(9, false, 25, 500, 500),
      new Target(0, false, 25, 500, 500),
    ]);

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

    for (const target of targets) {
      target.tick(ctx, (tar) => {
        console.log("Destroyed", tar);
      });
    }

    ctx.fillText("1", 50, 200);
    ctx.font = "50px Arial";
    requestAnimationFrame(animate);
  }, [ctx, targets]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    setCtx(ctx);

    canvas.addEventListener("click", (e) => {
      console.log(e.pageX, e.pageY);
      ctx.fillText(".", e.pageX, e.pageY);
      // For index add logic if it is wrong from spawner
      if (idx === questions.length - 1) {
        setIdx(0);
      } else {
        setIdx((previousIdx) => {
          return previousIdx + 1;
        });
      }
      setTimeQuestion(120);
      setScore((previousScore) => {
        return previousScore + 1;
      });
    });
  }, []);

  React.useEffect(() => {
    if (ctx) {
      animate(0);
    }
  }, [ctx]);

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
