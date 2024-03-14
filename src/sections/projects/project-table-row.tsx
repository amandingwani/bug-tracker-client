import { useState, MouseEvent } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { Project, ProjectStatusMap, ProjectUpdate } from 'src/redux/types';
import ItemPopoverMenu from 'src/components/itemPopoverMenu';
import { useAppSelector } from 'src/redux/hooks';
import { selectUser } from 'src/redux/slices/authSlice';
import { getProjectStatusLabelColor } from 'src/utils/getColor';
import ActionMenu from 'src/components/action-menu';

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

  // #############################################################################################
  // Action Menu = Menu to change status on click of the respective element
  const [fieldLoadingObj, setFieldLoadingObj] = useState<{
    status: boolean;
  }>({ status: false });
  const anyFieldLoading = fieldLoadingObj.status;
  const [ActionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const ActionMenuOpen = Boolean(ActionMenuAnchorEl);
  const handleActionMenuClick = (event: MouseEvent<HTMLDivElement>) => {
    if (anyFieldLoading) return;
    setActionMenuAnchorEl(event.currentTarget);
  };

  const project = props.project;

  const statusLabelColor = getProjectStatusLabelColor(project.status);

  return (
    <>
      <TableRow hover tabIndex={-1} sx={{ height: 77 }}>
        <TableCell
          component="th"
          scope="row"
          sx={{ minWidth: 200, width: { xs: 200, sm: 300, md: 350, lg: 400, xl: 500 } }}
        >
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

        <TableCell sx={{ minWidth: 150 }}>
          {project.owner.firstName + ' ' + project.owner.lastName}
        </TableCell>

        <TableCell sx={{ minWidth: 150 }}>
          {fieldLoadingObj.status ? (
            <Skeleton animation="wave" variant="text" />
          ) : (
            <Box data-field={'status'} data-pid={project.id} onClick={handleActionMenuClick}>
              <Label
                sx={{ cursor: isOwner ? (anyFieldLoading ? 'default' : 'pointer') : 'default' }}
                color={statusLabelColor}
              >
                {ProjectStatusMap[project.status]}
              </Label>
            </Box>
          )}
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

      {isOwner && (
        <ActionMenu
          open={ActionMenuOpen}
          anchorEl={ActionMenuAnchorEl}
          setAnchorEl={setActionMenuAnchorEl}
          project={project}
          fieldLoadingObj={fieldLoadingObj}
          setFieldLoadingObj={setFieldLoadingObj}
        />
      )}
    </>
  );
}
