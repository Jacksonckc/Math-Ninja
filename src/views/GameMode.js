import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';

const GameMode = () => {
  return (
    // <iframe
    //   height='300'
    //   scrolling='no'
    //   title='Menja'
    //   src='https://codepen.io/MillerTime/embed/BexBbE?default-tab=result'
    //   frameBorder='1'
    //   loading='lazy'
    //   allowFullScreen={true}
    // ></iframe>
    // <iframe
    //   src='https://previews.customer.envatousercontent.com/files/284246327/index.html'
    //   // allowfullscreen
    // ></iframe>

    <div>
      <div display='flex' justifyContent='center'>
        <form  id='GamemodeForm'>
          <ButtonGroup variant="contained" orientation='vertical' id="GamemodeButtonGroup">
            <Button onClick={() => (localStorage.setItem("difficulty", "easy"))}>Easy</Button>
            <Button onClick={() => (localStorage.setItem("difficulty", "medium"))}>Medium</Button>
            <Button onClick={() => (localStorage.setItem("difficulty", "hard"))}>Hard</Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  );
};

export default GameMode;

