import { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { Project, ProjectStatusMap, ProjectUpdate } from 'src/redux/types';
import { LabelColor } from 'src/components/label/labelSubTypes';
import ItemPopoverMenu from 'src/components/itemPopoverMenu';
import { useAppSelector } from 'src/redux/hooks';
import { selectUser } from 'src/redux/slices/authSlice';
import { Link } from '@mui/material';

// ----------------------------------------------------------------------

interface ProjectTableRowProps {
  key: number;
  project: Project;
  setOpenDrawer: (value: React.SetStateAction<boolean>) => void;
  setSelectedProject: (value: React.SetStateAction<ProjectUpdate | null>) => void;
  handleAlertClickOpen: () => void;
}

export default function ProjectTableRow(props: ProjectTableRowProps) {
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState<(EventTarget & Element) | null>(null);

  const isOwner = user?.id === props.project.owner.id;

  const handleOpenMenu = (event: React.MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const project = props.project;

  let statusLabelColor: LabelColor = 'success';
  if (project.status === 'CANCELED') statusLabelColor = 'error';
  else if (project.status === 'ON_HOLD') statusLabelColor = 'warning';

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell component="th" scope="row">
          <Link
            textTransform={'capitalize'}
            component={RouterLink}
            href={`/projects/${project.id}`}
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
            {project.name}
          </Link>
        </TableCell>

        <TableCell>{project.owner.firstName + ' ' + project.owner.lastName}</TableCell>

        <TableCell>
          <Label color={statusLabelColor}>{ProjectStatusMap[project.status]}</Label>
        </TableCell>

        <TableCell>{new Date(project.createdAt).toLocaleString()}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <ItemPopoverMenu
        allowedAction={isOwner ? { edit: true, delete: true } : { edit: false, delete: false }}
        open={open}
        handleCloseMenu={handleCloseMenu}
        project={project}
        setOpenDrawer={props.setOpenDrawer}
        setSelectedProject={props.setSelectedProject}
        handleAlertClickOpen={props.handleAlertClickOpen}
      />
    </>
  );
}
