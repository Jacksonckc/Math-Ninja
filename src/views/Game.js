import React from "react";
import { spawn } from "../game_src/spawn";

import { Target } from "../game_src/target";
import { Blade } from "../game_src/blade";
import "../game_src/style.css";
import { Button } from "@mui/material";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseIcon from "@mui/icons-material/Pause";

function Game() {
  const isGameActive = React.useRef(false);
  const [isPaused, setIsPaused] = React.useState(true);
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const [isGameOver, setIsGameOver] = React.useState(false);

  var score = React.useRef(0);
  var playerLives = React.useRef(3);
  var sword = React.useRef(new Blade("white"));
  var isSwinging = React.useRef(false);

  const lastTime = React.useRef(0);
  const gameTime = React.useRef(0);

  const question = React.useRef("");

  const readyTargets = React.useRef([]);
  const activeTargets = React.useRef([]);

  const canvasRef = React.useRef();
  const [ctx, setCtx] = React.useState();

  // draw game score
  const drawScore = (ctx) => {
    ctx.font = "50px serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${score.current}`, 10, 50);
  };

  // draw lives
  const drawLives = (ctx) => {
    ctx.font = "30px serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(`Player Lives: ${playerLives.current}`, 10, 650);
  };

  // draw Equation
  const drawEquation = (ctx, equation) => {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    ctx.font = "bold 50px serif";
    ctx.fillStyle = "LightBlue";
    ctx.textAlign = "center";
    ctx.fillText(`${equation}`, x, y);
  };

  // Generate new equation
  const startNewLevel = () => {
    const levelData = spawn(localStorage.getItem("difficulty") ?? "easy");

    activeTargets.current = [];
    readyTargets.current = levelData["targets"];
    question.current = levelData["equation"];
  };

  const setPaused = () => {
    isGameActive.current = isPaused;
    setIsPaused(!isPaused);
    setIsGameOver(false);
    if (isPaused) setIsGameStarted(true);
  };

  const removeFromActive = (target) => {
    const index = activeTargets.current.indexOf(target);
    activeTargets.current.splice(index, 1);
  };

  // Checks if player is still alive
  const checkPlayerAlive = () => {
    if (playerLives.current === 0) {
      isGameActive.current = false;
      setIsGameOver(true);
      isSwinging.current = false;
      saveInfo();
      playerLives.current = 3;
      score.current = 0;
      question.current = "";
    }
  };

  // save info to local storage
  const saveInfo = React.useCallback(() => {
    const difficulty = localStorage.getItem("difficulty");
    const current_date = new Date();
    const datetime = `${current_date.getDate()}/${
      current_date.getMonth() + 1
    }/${current_date.getFullYear()}@${current_date.getHours()}:${current_date.getMinutes()}:${current_date.getSeconds()}`;

    // Get user at local storage
    const user_data = JSON.parse(localStorage.getItem("user"));

    const newgame = {
      timestamp: datetime,
      game_score: score.current,
      difficulty: difficulty,
    };

    const games =
      user_data.hasOwnProperty("games") === false
        ? [newgame]
        : [...user_data.games, newgame];

    const metadata = { ...user_data, games };

    localStorage.setItem("user", JSON.stringify(metadata));
  }, []);

  // Mouse Handlers
  const startSwinging = () => {
    isSwinging.current = true;
  };

  const swing = ({ nativeEvent }) => {
    if (isSwinging.current) {
      const { offsetX, offsetY } = nativeEvent;
      sword.current.swing(offsetX, offsetY, isSwinging.current);
      for (const target of activeTargets.current) {
        const answer = sword.current.checkForSlice(
          target,
          offsetX,
          offsetY,
          score,
          playerLives
        );
        if (answer) {
          question.current = "";
        }
      }
    }
  };

  const endSwinging = () => {
    isSwinging.current = false;
  };

  // Handle Key Events
  const handleKeyDown = (e) => {
    if (e.code === "Space") {
      setPaused(!isGameActive.current);
    }
    console.log("space");
  };

  const animate = React.useCallback(
    (timestamp) => {
      lastTime.current = timestamp;

      const canvas = canvasRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!question.current) {
        startNewLevel();
      }

      drawScore(ctx);
      drawLives(ctx);
      drawEquation(ctx, question.current);

      if (isGameActive.current) {
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

        for (const target of activeTargets.current) {
          target.tick(ctx, (tar) => {
            // Remove self from activeTargets
            removeFromActive(tar);

            // Check if was correct answer
            if (tar.isCorrect()) {
              playerLives.current = playerLives.current - 1;
              startNewLevel();
            }
          });
        }
        sword.current.draw(ctx);
        if (gameTime.current % 2 === 0) {
          sword.current.update();
        }
      }

      checkPlayerAlive();

      //ctx.font = "50px Arial";

      requestAnimationFrame(animate);
      // ADJUST num FOR PREFERENCE OF BLADE
      gameTime.current += 1;
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

  // Setup the Game and Add event listener
  // React.useEffect(() => {
  //   // Conditional ensures that mounting twice does not mess up anything
  // }, []);

  React.useEffect(() => {
    if (ctx) {
      animate(0);
      window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
          setPaused();
        }
      });
    }
  }, [ctx]);

  const pauseOverlay = <div id="paused-overlay"></div>;

  const playButton = (
    <PlayCircleOutlineIcon id="play-button" onClick={setPaused} />
  );

  const pauseButton = <PauseIcon id="pause-button" onClick={setPaused} />;

  return (
    <div id="game-interface">
      <canvas
        id="canvas"
        // tabIndex="0"
        ref={canvasRef}
        onMouseDown={startSwinging}
        onMouseMove={swing}
        onMouseUp={endSwinging}
        // onKeyDown={() => {
        //   console.log("fired");
        // }}
      ></canvas>
      {isPaused ? playButton : pauseButton}
      {!isGameStarted ? pauseOverlay : null}
      {isGameOver ? (
        <div className="game-over">
          <div className="game-over__info">
            <h1>GAME OVER</h1>
            <p>
              You scored {score.current} on {localStorage.getItem("difficulty")}{" "}
              difficulty.
            </p>
            <button type="button" onClick={setPaused}>
              Play Again
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Game;
