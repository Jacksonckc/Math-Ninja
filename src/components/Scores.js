import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, time, score, difficulty) {
  return { id, time, score, difficulty };
}

let gamesData = JSON.parse(localStorage.getItem('user'))?.games;
!gamesData && (gamesData = []);
console.log(gamesData);
const rows = [];

gamesData.forEach((data, index) => {
  rows.push(
    createData(index, data.timestamp, data.game_score, data.difficulty)
  );
});

function preventDefault(event) {
  event.preventDefault();
}

export default function Scores() {
  return (
    <React.Fragment>
      <Title>Recent Scores</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Level</TableCell>

            <TableCell align='right'>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.difficulty}</TableCell>

              <TableCell align='right'>{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color='primary' href='#' onClick={preventDefault} sx={{ mt: 3 }}>
        See more history
      </Link>
    </React.Fragment>
  );
}
