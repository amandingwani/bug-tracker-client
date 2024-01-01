import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Iconify from 'src/components/iconify';
import { Project, ProjectUpdate, Ticket, TicketUpdate } from 'src/redux/types';

interface Props {
  open: (EventTarget & Element) | null;
  handleCloseMenu: () => void;
  project?: Project;
  ticket?: Ticket;
  setOpenDrawer?: (value: React.SetStateAction<boolean>) => void;
  setSelectedProject?: (value: React.SetStateAction<ProjectUpdate | null>) => void;
  setSelectedTicket?: (value: React.SetStateAction<TicketUpdate | null>) => void;
  handleAlertClickOpen: () => void;
}

const ItemPopoverMenu = ({
  open,
  handleCloseMenu,
  project,
  ticket,
  setOpenDrawer,
  setSelectedProject,
  setSelectedTicket,
  handleAlertClickOpen,
}: Props) => {
  let handleEdit: React.MouseEventHandler<HTMLLIElement> = handleCloseMenu;
  let handleDelete: React.MouseEventHandler<HTMLLIElement> = handleCloseMenu;
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
  } else if (ticket && setOpenDrawer && setSelectedTicket) {
    handleEdit = () => {
      setSelectedTicket({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description ?? '',
        status: ticket.status,
        type: ticket.type,
        priority: ticket.priority,
        projectId: ticket.projectId,
      });
      handleCloseMenu();
      setOpenDrawer(true);
    };
    handleDelete = () => {
      setSelectedTicket({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description ?? '',
        status: ticket.status,
        type: ticket.type,
        priority: ticket.priority,
        projectId: ticket.projectId,
      });
      handleCloseMenu();
      handleAlertClickOpen();
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

      <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
        <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
        Delete
      </MenuItem>
    </Popover>
  );
};

export default ItemPopoverMenu;
