import { useState } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useResponsive } from 'src/hooks/use-responsive';
import Popover from '@mui/material/Popover';

import Iconify from 'src/components/iconify';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

import TicketsFilters from './tickets-filters';
import { FilterData } from './types';

// ----------------------------------------------------------------------

interface TicketsTableToolbarProps {
  filterName: string;
  onFilterName?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  filterData: FilterData;
  setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
  onNewTicketClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function TicketsTableToolbar({
  filterName,
  onFilterName,
  filterData,
  setFilterData,
  onNewTicketClick,
}: TicketsTableToolbarProps) {
  const isXs = useResponsive('only', 'xs');
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
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
      <Stack
        direction="row"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ xs: 1, sm: 1.5, md: 2 }}
      >
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

        <TicketsFilters
          isXs={isXs}
          openFilter={openFilter}
          onOpenFilter={handleOpenFilter}
          onCloseFilter={handleCloseFilter}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      </Stack>
      {isXs ? (
        <IconButton
          aria-label="New Ticket"
          onClick={onNewTicketClick}
          size="medium"
          sx={{
            backgroundColor: '#000000',
            borderRadius: 1,
            '&:hover': {
              bgcolor: '#000000',
            },
          }}
        >
          <Iconify icon="eva:plus-fill" sx={{ color: '#ffffff' }} />
        </IconButton>
      ) : (
        <Button
          onClick={onNewTicketClick}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Ticket
        </Button>
      )}
    </Toolbar>
  );
}
