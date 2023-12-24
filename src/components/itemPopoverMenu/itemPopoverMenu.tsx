import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Iconify from 'src/components/iconify';
import { Project, ProjectUpdate, Ticket } from 'src/redux/types';

interface Props {
  open: (EventTarget & Element) | null;
  handleCloseMenu: () => void;
  project?: Project;
  ticket?: Ticket;
  setOpenDrawer?: (value: React.SetStateAction<boolean>) => void;
  setSelectedProject?: (value: React.SetStateAction<ProjectUpdate | null>) => void;
}

const ItemPopoverMenu = ({
  open,
  handleCloseMenu,
  project,
  ticket,
  setOpenDrawer,
  setSelectedProject,
}: Props) => {
  let handleEdit: React.MouseEventHandler<HTMLLIElement> = handleCloseMenu;
  if (project && setOpenDrawer && setSelectedProject) {
    handleEdit = () => {
      setSelectedProject({
        id: project.id,
        name: project.name,
        description: project.description ?? '',
        status: project.status,
      });
      handleCloseMenu();
      setOpenDrawer(true);
    };
  }

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
      <MenuItem onClick={handleEdit}>
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
