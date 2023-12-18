import { useState } from 'react';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { TicketStatusMap, Ticket } from 'src/redux/types';
import { LabelColor } from 'src/components/label/labelSubTypes';

// ----------------------------------------------------------------------

interface ProjectTableRowProps {
  key: number;
  ticket: Ticket;
}

export default function ProjectTableRow(props: ProjectTableRowProps) {
  const [open, setOpen] = useState<(EventTarget & Element) | null>(null);

  const ticket = props.ticket;

  const handleOpenMenu = (event: React.MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  let priorityLabelColor: LabelColor = 'default';
  if (ticket.priority === 'URGENT') priorityLabelColor = 'error';
  else if (ticket.priority === 'HIGH') priorityLabelColor = 'warning';

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell component="th" scope="row">
          <Typography variant="subtitle2" noWrap>
            {ticket.id}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {ticket.title}
          </Typography>
        </TableCell>

        <TableCell>{ticket.project.name}</TableCell>
        <TableCell>{ticket.author.firstName + ' ' + ticket.author.lastName}</TableCell>
        <TableCell>
          {ticket.asignee ? ticket.asignee.firstName + ' ' + ticket.asignee.lastName : 'Unassigned'}
        </TableCell>

        <TableCell>{TicketStatusMap[ticket.status]}</TableCell>
        <TableCell>{ticket.type ? ticket.type : '-'}</TableCell>

        <TableCell>
          <Label color={priorityLabelColor}>{ticket.priority ? ticket.priority : '-'}</Label>
        </TableCell>

        <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 140 },
          },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
