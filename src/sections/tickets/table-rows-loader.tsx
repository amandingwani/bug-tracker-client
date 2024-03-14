import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function TableRowsLoader({ rowsNum }: { rowsNum: number }) {
  return [...Array(rowsNum)].map((_row, index) => (
    <TableRow key={index} sx={{ height: 77 }}>
      <TableCell component="th" scope="row">
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell sx={{ width: 300 }}>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell sx={{ width: 150 }}>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell sx={{ width: 150 }}>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell sx={{ width: 150 }}>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell sx={{ width: 180 }}>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
    </TableRow>
  ));
}
