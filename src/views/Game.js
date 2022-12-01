import React from "react";

import { Target } from "../game_src/target";

function Game() {
  const [score, setScore] = React.useState(0);
  const [playerLives, setPlayerLives] = React.useState(3);

  const [idx, setIdx] = React.useState(0);
  const lastTime = React.useRef(0);

  const [questions, setQuestions] = React.useState([
    { answer: 3, question: "1 + 2" },
    { answer: 4, question: "2 + 2" },
    { answer: 4, question: "3 + 1" },
  ]);

  const [timeQuestion, setTimeQuestion] = React.useState(120);

  const [targets, setTargets] = React.useState([
    new Target(9, true, 30, 500, 500),
    new Target(3, false, 10, 500, 500),
    new Target(1, false, 25, 500, 500),
    new Target(7, false, 25, 500, 500),
    new Target(9, false, 25, 500, 500),
    new Target(0, false, 25, 500, 500),
  ]);

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

      for (const target of targets) {
        target.tick(ctx, (tar) => {
          console.log("Destroyed", tar);
        });
      }

      ctx.fillText("1", 50, 200);
      ctx.font = "50px Arial";
      requestAnimationFrame(animate);
    },
    [ctx, targets]
  );

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    setCtx(ctx);

    canvas.addEventListener("click", (e) => {
      console.log(e.pageX, e.pageY);
      console.log(score);

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
      <canvas ref={canvasRef} width="1000" height="1000"></canvas>;
      <button type="button" onClick={saveInfo}>
        Save
      </button>
    </div>
  );
}

export default Game;
