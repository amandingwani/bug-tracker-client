import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

// ----------------------------------------------------------------------

interface ProjectsTableToolbarProps {
  filterName: string;
  onFilterName?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onNewProjectClick: React.MouseEventHandler<HTMLButtonElement>;
  filterSelected: { other: boolean; created: boolean };
  handleCheckboxClick?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function ProjectsTableToolbar({
  filterName,
  onFilterName,
  onNewProjectClick,
  filterSelected,
  handleCheckboxClick,
}: ProjectsTableToolbarProps) {
  const [open, setOpen] = useState<(EventTarget & Element) | null>(null);

  const handleOpenMenu = (event: React.MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      <Stack direction="row" alignItems="center">
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Search project..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
        <Tooltip title="Filter list">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>

        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            paper: {
              sx: { width: 230 },
            },
          }}
        >
          <Typography>
            <Checkbox checked={filterSelected.other} name="other" onChange={handleCheckboxClick} />
            Created by other users
          </Typography>

          <Typography>
            <Checkbox
              checked={filterSelected.created}
              name="created"
              onChange={handleCheckboxClick}
            />
            Created by me
          </Typography>
        </Popover>
      </Stack>
      <Button
        onClick={onNewProjectClick}
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        New Project
      </Button>
    </Toolbar>
  );
}
