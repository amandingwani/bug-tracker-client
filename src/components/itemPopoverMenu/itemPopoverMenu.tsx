import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { Project, ProjectUpdate, Ticket } from 'src/redux/types';
import { AllowedAction } from './types';

interface Props {
  allowedAction: AllowedAction;
  open: (EventTarget & Element) | null;
  handleCloseMenu: () => void;
  project?: Project;
  ticket?: Ticket;
  setOpenDrawer?: (value: React.SetStateAction<boolean>) => void;
  setSelectedProject?: (value: React.SetStateAction<ProjectUpdate | null>) => void;
  setSelectedTicket?: (value: React.SetStateAction<Ticket | undefined>) => void;
  handleAlertClickOpen: () => void;
}

const ItemPopoverMenu = ({
  allowedAction,
  open,
  handleCloseMenu,
  project,
  ticket,
  setOpenDrawer,
  setSelectedProject,
  setSelectedTicket,
  handleAlertClickOpen,
}: Props) => {
  const router = useRouter();

  let handleView: React.MouseEventHandler<HTMLLIElement> = handleCloseMenu;
  let handleEdit: React.MouseEventHandler<HTMLLIElement> = handleCloseMenu;
  let handleDelete: React.MouseEventHandler<HTMLLIElement> = handleCloseMenu;
  if (project && setOpenDrawer && setSelectedProject) {
    handleView = () => {
      handleCloseMenu();
      router.push(`/projects/${project.id}`);
    };
    if (allowedAction.edit) {
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
    if (allowedAction.delete) {
      handleDelete = () => {
        setSelectedProject({
          id: project.id,
          name: project.name,
          description: project.description ?? '',
          status: project.status,
        });
        handleCloseMenu();
        handleAlertClickOpen();
      };
    }
  } else if (ticket && setOpenDrawer && setSelectedTicket) {
    handleView = () => {
      handleCloseMenu();
      router.push(`/projects/${ticket.project.id}/tickets/${ticket.id}`);
    };
    if (allowedAction.edit) {
      handleEdit = () => {
        setSelectedTicket(ticket);
        handleCloseMenu();
        setOpenDrawer(true);
      };
    }
    if (allowedAction.delete) {
      handleDelete = () => {
        setSelectedTicket(ticket);
        handleCloseMenu();
        handleAlertClickOpen();
      };
    }
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
      <MenuItem onClick={handleView}>
        <Iconify icon="carbon:view-filled" sx={{ mr: 2 }} />
        View
      </MenuItem>

      {allowedAction.edit && (
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
      )}

      {allowedAction.delete && (
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      )}
    </Popover>
  );
};

export default ItemPopoverMenu;
