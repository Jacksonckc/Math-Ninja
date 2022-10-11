import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/SignIn');
    } catch (err) {
      alert(err);
    }
  };
  return (
    // <body>
    //   <canvas id='c'></canvas>

    //   <div class='hud'>
    //     <div class='hud__score'>
    //       <div class='score-lbl'></div>
    //       <div class='cube-count-lbl'></div>
    //     </div>
    //     <div class='pause-btn'>
    //       <div></div>
    //     </div>
    //     <div class='slowmo'>
    //       <div class='slowmo__bar'></div>
    //     </div>
    //   </div>

    //   <div class='menus'>
    //     <div class='menu menu--main'>
    //       <h1>MENJA</h1>
    //       <button type='button' class='play-normal-btn'>
    //         PLAY GAME
    //       </button>
    //       <button type='button' class='play-casual-btn'>
    //         CASUAL MODE
    //       </button>
    //       <div class='credits'>
    //         An 8kB game by <a href='https://cmiller.tech'>Caleb Miller</a>
    //       </div>
    //     </div>
    //     <div class='menu menu--pause'>
    //       <h1>Paused</h1>
    //       <button type='button' class='resume-btn'>
    //         RESUME GAME
    //       </button>
    //       <button type='button' class='menu-btn--pause'>
    //         MAIN MENU
    //       </button>
    //     </div>
    //     <div class='menu menu--score'>
    //       <h1>Game Over</h1>
    //       <h2>Your Score:</h2>
    //       <div class='final-score-lbl'></div>
    //       <div class='high-score-lbl'></div>
    //       <button type='button' class='play-again-btn'>
    //         PLAY AGAIN
    //       </button>
    //       <button type='button' class='menu-btn--score'>
    //         MAIN MENU
    //       </button>
    //     </div>
    //   </div>
    // </body>
    <button onClick={handleSignOut}>Out</button>
  );
};
export default Game;
