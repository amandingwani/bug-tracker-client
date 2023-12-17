import { useState } from 'react';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { Project, ProjectStatusMap } from 'src/redux/types';
import { LabelColor } from 'src/components/label/labelSubTypes';

// ----------------------------------------------------------------------

interface ProjectTableRowProps {
  key: number;
  project: Project;
}

export default function ProjectTableRow(props: ProjectTableRowProps) {
  const [open, setOpen] = useState<(EventTarget & Element) | null>(null);

  const project = props.project;

  const handleOpenMenu = (event: React.MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  let statusLabelColor: LabelColor = 'success';
  if (project.status === 'CANCELED') statusLabelColor = 'error';
  else if (project.status === 'ON_HOLD') statusLabelColor = 'warning';

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell component="th" scope="row">
          <Typography variant="button" noWrap textTransform={'capitalize'}>
            {project.name}
          </Typography>
        </TableCell>

        <TableCell>{project.owner.firstName + ' ' + project.owner.lastName}</TableCell>

        <TableCell>
          <Label color={statusLabelColor}>{ProjectStatusMap[project.status]}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
