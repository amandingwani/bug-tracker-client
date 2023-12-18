import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';

import Iconify from 'src/components/iconify';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface TicketsTableToolbarProps {
  filterName: string;
  onFilterName?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  filterSelected: { assign: boolean; created: boolean };
  handleCheckboxClick?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function TicketsTableToolbar({
  filterName,
  onFilterName,
  filterSelected,
  handleCheckboxClick,
}: TicketsTableToolbarProps) {
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
          placeholder="Search ticket..."
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
              sx: { width: 140 },
            },
          }}
        >
          <Typography>
            <Checkbox
              checked={filterSelected.assign}
              name="assign"
              onChange={handleCheckboxClick}
            />
            Assigned to me
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
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
        New Ticket
      </Button>
    </Toolbar>
  );
}
