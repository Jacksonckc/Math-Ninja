import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, message) {
  return { id, date, message };
}

const rows = [
  createData('01', '16 Mar, 2019', 'You have not been playing for a while!'),
  createData('02', '16 Mar, 2019', 'Your average score dropped'),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Notification() {
  return (
    <React.Fragment>
      <Title>Recent Notification</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Date</TableCell>

            <TableCell align='center'>Notification</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>

              <TableCell align='center'>{row.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
