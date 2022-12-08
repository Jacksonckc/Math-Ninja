import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Generate Order Data
function createData(id, time, score, difficulty, wrong_answers) {
  return { id, time, score, difficulty, wrong_answers };
}

let gamesData = JSON.parse(localStorage.getItem("user"))?.games;
!gamesData && (gamesData = []);
// console.log(gamesData);
const rows = [];

gamesData.forEach((data, index) => {
  rows.push(
    createData(
      index,
      data.timestamp,
      data.game_score,
      data.difficulty,
      data.wrong_answers
    )
  );
});

function preventDefault(event) {
  event.preventDefault();
}

export default function Scores() {
  const [open, setOpen] = useState(false);
  const [missedQuestions, setMissedQuestions] = useState([]);
  const handleOpen = (missed_questions) => {
    setOpen(!open);
    setMissedQuestions(missed_questions);
  };
  return (
    <React.Fragment>
      <Title>Recent Scores</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Missed Questions</TableCell>

            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.difficulty}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(row.wrong_answers)}>
                  See More
                </Button>
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more history
      </Link>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Here's the questions you missed
          </Typography>
          {missedQuestions.map((question, index) => {
            return (
              <div key={index}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {question}
                </Typography>
              </div>
            );
          })}
        </Box>
      </Modal>
    </React.Fragment>
  );
}
