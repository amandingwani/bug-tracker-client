import { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { Contributor } from 'src/redux/types';
import { LabelColor } from 'src/components/label/labelSubTypes';

// ----------------------------------------------------------------------

interface UsersTableRowProps {
  key: number;
  user: Contributor;
  actionAllowed: boolean;
  setOpenDrawer: (value: React.SetStateAction<boolean>) => void;
  setSelectedUser: (value: React.SetStateAction<Contributor | null>) => void;
  handleAlertClickOpen: () => void;
}

export default function UsersTableRow(props: UsersTableRowProps) {
  const [open, setOpen] = useState<(EventTarget & Element) | null>(null);

  const handleOpenMenu = (event: React.MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRemove = () => {
    props.setSelectedUser(user);
    handleCloseMenu();
    props.handleAlertClickOpen();
  };

  const user = props.user;

  let statusLabelColor: LabelColor = 'success';
  if (!user.registered) statusLabelColor = 'warning';

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ height: 77 }}>
        <TableCell component="th" scope="row">
          {user.lastName ? user.firstName + ' ' + user.lastName : user.firstName}
        </TableCell>

        <TableCell>{user.email}</TableCell>

        <TableCell>
          <Label color={statusLabelColor}>{user.registered ? 'Active' : 'Pending'}</Label>
        </TableCell>

        {props.actionAllowed && (
          <TableCell align="right">
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        )}
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
        <MenuItem onClick={handleRemove} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Remove
        </MenuItem>
      </Popover>
    </>
  );
}
