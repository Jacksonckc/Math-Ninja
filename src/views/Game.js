import React from "react";
import { spawn } from "../game_src/spawn";

import { Target } from "../game_src/target";

function Game() {
  const paused = React.useRef(false);

  const [score, setScore] = React.useState(0);
  const [playerLives, setPlayerLives] = React.useState(3);

  const [idx, setIdx] = React.useState(0);
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
    ctx.fillText(`Score: ${score}`, 10, 50);
  };

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

  const animate = React.useCallback(
    (timestamp) => {
      lastTime.current = timestamp;

      

      const canvas = canvasRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawScore(ctx);

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
            activeTargets.current.splice(tar, 1);
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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    setCtx(ctx);

    if (!question) {
      const levelData = spawn(localStorage.getItem("difficulty") ?? "easy");
      
      readyTargets.current = levelData["targets"];
      setQuestion(levelData["equation"]);
    }


    

    canvas.addEventListener("click", (e) => {
      const handleMouseDown = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        console.log(`X: ${offsetX}, Y: ${offsetY}`);
      };
      for (const target of activeTargets.current) {
        if (target.isWithinHitBox(e.offsetX, e.offsetY)) {
          //increase score here
        } else {
          //decrease score here
        }
      }

      console.log(e.pageX, e.pageY);
      console.log(score);

      ctx.fillText(".", e.pageX, e.pageY);
      
      // TODO generate next question
      
      setTimeQuestion(120);
      setScore((new_score) => {
        return (new_score += 1);
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
      <canvas ref={canvasRef}></canvas>;
      <button type="button" onClick={saveInfo}>
        Save
      </button>
    </div>
  );
}

export default Game;
