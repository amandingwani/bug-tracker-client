import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Iconify from '../iconify';
import LoadingButton from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

interface Props {
  open: boolean;
  handleClose: () => void;
  handleAction: () => void;
  title: string;
  message?: string;
  loading: boolean;
}

export default function AlertDialog({
  open,
  handleClose,
  title,
  message,
  handleAction,
  loading,
}: Props) {
  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          onClick={handleAction}
          variant="outlined"
          color="error"
          autoFocus
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Delete
        </LoadingButton>
        <Button onClick={handleClose} variant="outlined" color="inherit">
          Cancel
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}
