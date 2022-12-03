import React from "react";
import { spawn } from "../game_src/spawn";

import { Target } from "../game_src/target";
import { Blade } from "../game_src/blade";
import "../game_src/style.css";
import { Button } from "@mui/material";

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/Pause';

function Game() {
  const isGameActive = React.useRef(false);
  const [isPaused, setIsPaused] = React.useState(true)
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  
  var score = React.useRef(0);
  var playerLives = React.useRef(3);
  var sword = new Blade("white");
  var isSwinging = React.useRef(false);

  const lastTime = React.useRef(0);

  const question = React.useRef("");

  const readyTargets = React.useRef([]);
  const activeTargets = React.useRef([]);

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

  const startNewLevel = () => {
    const levelData = spawn(localStorage.getItem("difficulty") ?? "easy");
    
    activeTargets.current = [];
    readyTargets.current = levelData["targets"];
    question.current = levelData["equation"];
    
    console.log(levelData["equation"]);
  }

  const setPaused = (newValue) => {
    isGameActive.current = !newValue;
    setIsPaused(newValue);
    if (!newValue) setIsGameStarted(true);
  }

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
    const { offsetX, offsetY } = nativeEvent;
    sword.swing(offsetX, offsetY);
    if (isSwinging.current) {
      for (const target of activeTargets.current) {
        sword.checkForSlice(target, offsetX, offsetY, score, playerLives);
      }
    }
  };

  const endSwinging = () => {
    isSwinging.current = false;
  };
  
  /*const handleMouseDown = React.useCallback(({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log(`X: ${offsetX}, Y: ${offsetY}`);
    for (const target of activeTargets.current) {
      if (target.isWithinHitBox(offsetX, offsetY)) {
        target.kill();
        score.current = score.current + 1;
        
        // Generate new level
        startNewLevel();

        // Stop looping
        break;
      } else {
        //decrease score here
        playerLives.current = playerLives.current - 1;
      }
    }
    
  }, []);*/

  const animate = React.useCallback(
    (timestamp) => {
      lastTime.current = timestamp;

      const canvas = canvasRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
            const index = activeTargets.current.indexOf(tar);
            activeTargets.current.splice(index, 1);

            // Check if was correct answer
            if (tar.isCorrect()) {
              // TODO loose a life and start new round
              console.log("Correct answer went off screen!");
            }
            
            console.log("Destroyed", tar);
          });
        }
      }
      drawScore(ctx);
      drawLives(ctx);
      sword.draw(ctx, isSwinging.current);
      sword.update();

      

      //ctx.font = "50px Arial";
      
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

  // Setup the Game and Add event listener
  React.useEffect(() => {
    // Conditional ensures that mounting twice does not mess up anything
    if (!question.current) {
      startNewLevel();

      window.addEventListener("keydown", (e) => {
        if (e.code == "Space") {
          setPaused(isGameActive.current);
        }
      });
    }
  }, []);

  React.useEffect(() => {
    if (ctx) {
      animate(0);
    }
  }, [ctx]);

  const pauseOverlay = (
    <div id="paused-overlay"></div>
  );

  const playButton = (
    <PlayCircleOutlineIcon
      id="play-button"
      onClick={() => setPaused(false) }
    />
  );

  const pauseButton = (
    <PauseIcon
      id="pause-button"
      onClick={() => setPaused(true) }
    />
  );

  return (
    <div id="game-interface">
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseDown={startSwinging}
        onMouseMove={swing}
        onMouseUp={endSwinging}
      ></canvas>
      
      <button
        id="save-button"
        onClick={saveInfo}
      >
        Save
      </button>
      {isPaused ? playButton : pauseButton}
      {isPaused && isGameStarted ? pauseOverlay : null}
    </div>
  );
}

export default Game;
