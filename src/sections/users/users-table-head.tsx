import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from './utils';
import { Contributor } from 'src/redux/types';

// ----------------------------------------------------------------------

interface UsersTableHeadProps {
  order: 'asc' | 'desc';
  orderBy: string;
  headLabel: Array<any>;
  onRequestSort: (
    _event: React.MouseEvent<HTMLSpanElement>,
    id: keyof Contributor | 'name'
  ) => void;
}

export default function UsersTableHead({
  order,
  orderBy,
  headLabel,
  onRequestSort,
}: UsersTableHeadProps) {
  const onSort =
    (property: keyof Contributor | 'name') => (event: React.MouseEvent<HTMLSpanElement>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => {
          if (headCell.noSort) {
            return (
              <TableCell
                key={headCell.id}
                align={headCell.align || 'left'}
                sx={{ width: headCell.width, minWidth: headCell.minWidth }}
              >
                {headCell.label}
              </TableCell>
            );
          } else {
            return (
              <TableCell
                key={headCell.id}
                align={headCell.align || 'left'}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{ width: headCell.width, minWidth: headCell.minWidth }}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={onSort(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box sx={{ ...visuallyHidden }}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
}
