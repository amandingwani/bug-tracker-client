import { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import ItemPopoverMenu from 'src/components/itemPopoverMenu';
import { TicketStatusMap, Ticket, TicketUpdate } from 'src/redux/types';
import { LabelColor } from 'src/components/label/labelSubTypes';

// ----------------------------------------------------------------------

interface ProjectTableRowProps {
  key: number;
  ticket: Ticket;
  setOpenDrawer: (value: React.SetStateAction<boolean>) => void;
  setSelectedTicket: (value: React.SetStateAction<TicketUpdate | null>) => void;
  handleAlertClickOpen: () => void;
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
          <Typography
            variant="subtitle2"
            noWrap
            component={RouterLink}
            href={`/projects/${ticket.projectId}/tickets/${ticket.id}`}
          >
            {ticket.title}
          </Typography>
        </TableCell>

        <TableCell>{ticket.author.firstName + ' ' + ticket.author.lastName}</TableCell>
        <TableCell>
          {ticket.asignee ? ticket.asignee.firstName + ' ' + ticket.asignee.lastName : 'Unassigned'}
        </TableCell>

        <TableCell>{TicketStatusMap[ticket.status]}</TableCell>
        <TableCell>{ticket.type}</TableCell>

        <TableCell>
          <Label color={priorityLabelColor}>{ticket.priority}</Label>
        </TableCell>

        <TableCell>
          <Typography
            variant="subtitle2"
            noWrap
            component={RouterLink}
            href={`/projects/${ticket.projectId}`}
          >
            {ticket.project.name}
          </Typography>
        </TableCell>

        <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <ItemPopoverMenu
        open={open}
        handleCloseMenu={handleCloseMenu}
        ticket={ticket}
        setOpenDrawer={props.setOpenDrawer}
        setSelectedTicket={props.setSelectedTicket}
        handleAlertClickOpen={props.handleAlertClickOpen}
      />
    </>
  );
}
