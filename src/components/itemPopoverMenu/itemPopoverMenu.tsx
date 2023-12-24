import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Iconify from 'src/components/iconify';

interface Props {
  open: (EventTarget & Element) | null;
  handleCloseMenu: () => void;
}

const ItemPopoverMenu = ({ open, handleCloseMenu }: Props) => {
  return (
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
  );
};

export default ItemPopoverMenu;
