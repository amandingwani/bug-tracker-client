import { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import ItemPopoverMenu from 'src/components/itemPopoverMenu';
import { TicketStatusMap, Ticket } from 'src/redux/types';
import { LabelColor } from 'src/components/label/labelSubTypes';
import { Link } from '@mui/material';
import { AllowedAction } from 'src/components/itemPopoverMenu/types';
import { useAppSelector } from 'src/redux/hooks';
import { selectUser } from 'src/redux/slices/authSlice';

// ----------------------------------------------------------------------

interface TicketTableRowProps {
  key: number;
  ticket: Ticket;
  setOpenDrawer: (value: React.SetStateAction<boolean>) => void;
  setSelectedTicket: (value: React.SetStateAction<Ticket | undefined>) => void;
  handleAlertClickOpen: () => void;
}

export default function TicketTableRow(props: TicketTableRowProps) {
  const user = useAppSelector(selectUser);

  const [open, setOpen] = useState<(EventTarget & Element) | null>(null);

  const ticket = props.ticket;

  // Allowed actions for the popover menu #########################################################
  const allowedAction: AllowedAction = {
    edit: false,
    delete: false,
  };

  // user can be author or project owner to delete
  if (user?.id === props.ticket.author.id || user?.id === props.ticket.project.owner.id)
    allowedAction.delete = true;

  // user can be author or assignee or project owner to edit
  if (allowedAction.delete || user?.id === props.ticket.assignee?.id) allowedAction.edit = true;

  // #############################################################################################

  const handleOpenMenu = (event: React.MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  let priorityLabelColor: LabelColor;
  switch (ticket.priority) {
    case 'HIGH':
      priorityLabelColor = 'warning';
      break;
    case 'URGENT':
      priorityLabelColor = 'error';
      break;
    case 'NORMAL':
      priorityLabelColor = 'info';
      break;
    case 'LOW':
      priorityLabelColor = 'success';
      break;

    default:
      priorityLabelColor = 'default';
      break;
  }

  let statusLabelColor: LabelColor;
  switch (ticket.status) {
    case 'OPEN':
      statusLabelColor = 'warning';
      break;
    case 'IN_PROGRESS':
      statusLabelColor = 'info';
      break;
    case 'TO_BE_TESTED':
      statusLabelColor = 'secondary';
      break;
    case 'CLOSED':
      statusLabelColor = 'success';
      break;

    default:
      statusLabelColor = 'default';
      break;
  }

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ height: 77 }}>
        <TableCell component="th" scope="row">
          <Typography variant="subtitle2" noWrap>
            {ticket.id}
          </Typography>
        </TableCell>
        <TableCell sx={{ minWidth: 300 }}>
          <Link
            variant="subtitle2"
            component={RouterLink}
            href={`/projects/${ticket.project.id}/tickets/${ticket.id}`}
            underline="none"
            fontWeight={600}
            sx={{
              '&:hover': {
                color: 'primary.darker',
              },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {ticket.title}
          </Link>
        </TableCell>

        <TableCell>
          <Label color={priorityLabelColor}>{ticket.priority}</Label>
        </TableCell>

        <TableCell sx={{ minWidth: 150 }}>
          <Typography
            variant="inherit"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {ticket.author.firstName + ' ' + ticket.author.lastName}
          </Typography>
        </TableCell>
        <TableCell sx={{ minWidth: 150 }}>
          <Typography
            variant="inherit"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {ticket.assignee
              ? ticket.assignee.firstName + ' ' + ticket.assignee.lastName
              : 'Unassigned'}
          </Typography>
        </TableCell>

        <TableCell sx={{ minWidth: 150 }}>
          <Label color={statusLabelColor}>{TicketStatusMap[ticket.status]}</Label>
        </TableCell>
        <TableCell>
          <Label color={ticket.type === 'BUG' ? 'error' : 'success'}>{ticket.type}</Label>
        </TableCell>

        <TableCell sx={{ minWidth: 180 }}>
          <Link
            variant="subtitle2"
            component={RouterLink}
            href={`/projects/${ticket.project.id}`}
            underline="none"
            fontWeight={600}
            sx={{
              '&:hover': {
                color: 'primary.darker',
              },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {ticket.project.name}
          </Link>
        </TableCell>

        <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <ItemPopoverMenu
        allowedAction={allowedAction}
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
