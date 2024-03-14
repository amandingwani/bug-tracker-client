import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { hideNotification, selectNotification } from 'src/redux/slices/notificationSlice';

// ---------------------------------------------------------------------

export default function SnackbarNotification() {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(selectNotification);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={notification.durationMS}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        severity={notification.severity}
        onClose={notification.durationMS ? handleClose : undefined}
        sx={{ width: '100%' }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
}
