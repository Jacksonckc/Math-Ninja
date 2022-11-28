import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";

const GameMode = () => {
  return (
    <div>
      <div display="flex" justifyContent="center">
        <form id="GamemodeForm">
          <ButtonGroup
            variant="contained"
            orientation="vertical"
            id="GamemodeButtonGroup"
          >
            <Button onClick={() => localStorage.setItem("difficulty", "easy")}>
              <Link to="/Game">Easy</Link>
            </Button>
            <Button
              onClick={() => localStorage.setItem("difficulty", "medium")}
            >
              <Link to="/Game">Medium</Link>
            </Button>
            <Button onClick={() => localStorage.setItem("difficulty", "hard")}>
              <Link to="/Game">Hard</Link>
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  );
};

export default GameMode;
