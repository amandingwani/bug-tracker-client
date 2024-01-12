import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { hideNotification, selectNotification } from 'src/redux/slices/notificationSlice';

// ---------------------------------------------------------------------

export default function SnackbarNotification() {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(selectNotification);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideNotification());
  };

  return (
    <Snackbar open={notification.open} autoHideDuration={10000} onClose={handleClose}>
      <Alert
        variant="filled"
        severity={notification.severity}
        onClose={handleClose}
        sx={{ width: '100%' }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
}
