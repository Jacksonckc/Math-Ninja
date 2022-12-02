import React from "react";
import { spawn } from "../game_src/spawn";

import { Target } from "../game_src/target";
import "../game_src/style.css";

function Game() {
  const paused = React.useRef(false);

  var score = React.useRef(0);
  var playerLives = React.useRef(3);

  const lastTime = React.useRef(0);

  const [question, setQuestion] = React.useState("");

  const [timeQuestion, setTimeQuestion] = React.useState(120);

  const readyTargets = React.useRef([]);
  const activeTargets = React.useRef([]);

  const canvasRef = React.useRef();
  const [ctx, setCtx] = React.useState();

  // draw game score
  const drawScore = (ctx) => {
    ctx.font = "50px serif";
    ctx.fillStyle = "orange";
    ctx.fillText(`Score: ${score.current}`, 10, 50);
  };

  // draw lives
  const drawLives = (ctx) => {
    ctx.font = "30px serif";
    ctx.fillStyle = "blue";
    ctx.fillText(`Player Lives: ${playerLives.current}`, 10, 650);
  };

  const startNewLevel = () => {
    const levelData = spawn(localStorage.getItem("difficulty") ?? "easy");
      
    readyTargets.current = levelData["targets"];
    setQuestion(levelData["equation"]);

    console.log(levelData["equation"]);
  }

  // save info to local storage
  const saveInfo = () => {
    const difficulty = localStorage.getItem("difficulty");
    const current_date = new Date();
    const datetime = `${current_date.getDate()}/${
      current_date.getMonth() + 1
    }/${current_date.getFullYear()}@${current_date.getHours()}:${current_date.getMinutes()}:${current_date.getSeconds()}`;

    // Get user at local storage
    const user_data = JSON.parse(localStorage.getItem("user"));

    const newgame = {
      timestamp: datetime,
      game_score: score,
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
    for (const target of activeTargets.current) {
      if (target.isWithinHitBox(offsetX, offsetY)) {
        score.current = score.current + 1;
      } else {
        //decrease score here
        playerLives.current = playerLives.current - 1;
      }
    }
    // For index add logic if it is wrong from spawner
    // TODO on victory, generate new level
    setTimeQuestion(120);
  };

  const animate = React.useCallback(
    (timestamp) => {
      lastTime.current = timestamp;

      const canvas = canvasRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawScore(ctx);
      drawLives(ctx);

      if (!(paused.current)) {
        let activeCount;
        switch (localStorage.getItem("difficulty") ?? "easy") {
          case "easy":
            activeCount = 3;
            break;
          case "medium":
            activeCount = 4;
            break;
          case "hard":
            activeCount = 5;
            break;
          default:
            activeCount = 3;
        }

        if (activeTargets.current.length < activeCount) {
          const count = activeCount - activeTargets.current.length;

          for (let i = 0; i < count; i++) {
            const targetToAdd = readyTargets.current.pop();
            if (targetToAdd) {
              targetToAdd.start(ctx);
              activeTargets.current.push(targetToAdd);
            }
          }
        }
        const it = [];


        for (const target of activeTargets.current) {
          target.tick(ctx, (tar) => {
            const index = activeTargets.current.indexOf(tar);
            activeTargets.current.splice(index, 1);
            console.log("Destroyed", tar);
          });
        }
      }

      

      ctx.font = "50px Arial";
      requestAnimationFrame(animate);
    },
    [ctx]
  );

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setCtx(ctx);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

  }, []);

  React.useEffect(() => {
    if (!question) {
      startNewLevel();
    }
  }, []);

  React.useEffect(() => {
    if (ctx) {
      animate(0);
    }
  }, [ctx]);

  return (
    <div>
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
      ></canvas>
      <button type="button" onClick={saveInfo}>
        Save
      </button>
    </div>
  );
}

export default Game;
