import { useState, MouseEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import ItemPopoverMenu from 'src/components/itemPopoverMenu';
import { TicketStatusMap, Ticket } from 'src/redux/types';
import { AllowedAction } from 'src/components/itemPopoverMenu/types';
import { useAppSelector } from 'src/redux/hooks';
import { selectUser } from 'src/redux/slices/authSlice';
import {
  getTicketPriorityLabelColor,
  getTicketStatusLabelColor,
  getTicketTypeLabelColor,
} from 'src/utils/getColor';
import ActionMenu from 'src/components/action-menu';

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

  // a user who has delete permissions will always have edit permissions
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

  // #############################################################################################
  // Action Menu = Menu to change priority, status or type on click of the respective element
  const [fieldLoadingObj, setFieldLoadingObj] = useState<{
    priority: boolean;
    status: boolean;
    type: boolean;
  }>({ priority: false, status: false, type: false });
  const anyFieldLoading =
    fieldLoadingObj.priority || fieldLoadingObj.status || fieldLoadingObj.type;
  const [ActionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const ActionMenuOpen = Boolean(ActionMenuAnchorEl);
  const handleActionMenuClick = (event: MouseEvent<HTMLDivElement>) => {
    if (anyFieldLoading) return;
    setActionMenuAnchorEl(event.currentTarget);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ height: 77 }}>
        <TableCell component="th" scope="row">
          <Typography variant="subtitle2" noWrap>
            {ticket.id}
          </Typography>
        </TableCell>
        <TableCell sx={{ minWidth: 250, width: { xs: 250, sm: 250, md: 300, lg: 350, xl: 400 } }}>
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
          {fieldLoadingObj.priority ? (
            <Skeleton animation="wave" variant="text" />
          ) : (
            <Box data-field={'priority'} onClick={handleActionMenuClick}>
              <Label
                sx={{
                  cursor: allowedAction.edit
                    ? anyFieldLoading
                      ? 'default'
                      : 'pointer'
                    : 'default',
                }}
                color={getTicketPriorityLabelColor(ticket.priority)}
              >
                {ticket.priority}
              </Label>
            </Box>
          )}
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
          {fieldLoadingObj.status ? (
            <Skeleton animation="wave" variant="text" />
          ) : (
            <Box data-field={'status'} onClick={handleActionMenuClick}>
              <Label
                color={getTicketStatusLabelColor(ticket.status)}
                sx={{
                  cursor: allowedAction.edit
                    ? anyFieldLoading
                      ? 'default'
                      : 'pointer'
                    : 'default',
                }}
              >
                {TicketStatusMap[ticket.status]}
              </Label>
            </Box>
          )}
        </TableCell>

        <TableCell>
          {fieldLoadingObj.type ? (
            <Skeleton animation="wave" variant="text" />
          ) : (
            <Box data-field={'type'} onClick={handleActionMenuClick}>
              <Label
                color={getTicketTypeLabelColor(ticket.type)}
                sx={{
                  cursor: allowedAction.edit
                    ? anyFieldLoading
                      ? 'default'
                      : 'pointer'
                    : 'default',
                }}
              >
                {ticket.type}
              </Label>
            </Box>
          )}
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

      {allowedAction.edit && (
        <ActionMenu
          open={ActionMenuOpen}
          anchorEl={ActionMenuAnchorEl}
          setAnchorEl={setActionMenuAnchorEl}
          ticket={ticket}
          fieldLoadingObj={fieldLoadingObj}
          setFieldLoadingObj={setFieldLoadingObj}
        />
      )}
    </>
  );
}
