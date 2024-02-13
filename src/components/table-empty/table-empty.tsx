import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TableEmpty({
  heading,
  msg,
  colSpan,
}: {
  heading: string;
  msg: string;
  colSpan: number;
}) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={colSpan} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            {heading}
          </Typography>

          <Typography variant="body2">{msg}</Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}
