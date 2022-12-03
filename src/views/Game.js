import React from "react";

import { Target } from "../game_src/target";
import { Blade } from "../game_src/blade";
import "../game_src/style.css";

function Game() {
  var score = React.useRef(0);
  var playerLives = React.useRef(3);
  var sword = new Blade("white");
  var isSwinging = React.useRef(false);

  const [idx, setIdx] = React.useState(0);
  const lastTime = React.useRef(0);

  const [questions, setQuestions] = React.useState([
    { answer: 3, question: "1 + 2" },
    { answer: 4, question: "2 + 2" },
    { answer: 4, question: "3 + 1" },
  ]);

  const [timeQuestion, setTimeQuestion] = React.useState(120);

  const [targets, setTargets] = React.useState([
    new Target(9, true, 5, 500, 500),
    new Target(3, false, 5, 500, 500),
    new Target(1, false, 3, 500, 500),
    new Target(7, false, 8, 500, 500),
    new Target(5, false, 4, 500, 500),
    new Target(0, false, 1, 500, 500),
  ]);

  const canvasRef = React.useRef();
  const [ctx, setCtx] = React.useState();

  // draw game score
  const drawScore = (ctx) => {
    ctx.font = "50px serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score.current}`, 10, 50);
  };

  // draw lives
  const drawLives = (ctx) => {
    ctx.font = "30px serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Player Lives: ${playerLives.current}`, 10, 650);
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

  // Mouse Handlers
  const startSwinging = () => {
    isSwinging.current = true;
  };

  const swing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    sword.swing(offsetX, offsetY);
    if (isSwinging.current) {
      for (const target of targets) {
        sword.checkForSlice(target, offsetX, offsetY, score, playerLives);
      }
    }
  };

  const endSwinging = () => {
    isSwinging.current = false;
  };

  const animate = React.useCallback(
    (timestamp) => {
      lastTime.current = timestamp;

      const canvas = canvasRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const target of targets) {
        if (!target.active) {
          target.start(ctx);
        }
        target.tick(ctx, (tar) => {
          // console.log("Destroyed", tar);
        });
      }
      drawScore(ctx);
      drawLives(ctx);
      sword.draw(ctx, isSwinging.current);
      sword.update();
      requestAnimationFrame(animate);
    },
    [ctx, targets]
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
    if (ctx) {
      animate(0);
    }
  }, [ctx]);

  return (
    <div>
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseDown={startSwinging}
        onMouseMove={swing}
        onMouseUp={endSwinging}
      ></canvas>
      <button type="button" onClick={saveInfo}>
        Save
      </button>
    </div>
  );
}

export default Game;
