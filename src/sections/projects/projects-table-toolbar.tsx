import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

interface ProjectsTableToolbarProps {
  numSelected: number;
  filterName: string;
  onFilterName?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export default function ProjectsTableToolbar({
  numSelected,
  filterName,
  onFilterName,
}: ProjectsTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <>
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>

          <Tooltip title="Delete">
            <IconButton>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
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
              <IconButton>
                <Iconify icon="ic:round-filter-list" />
              </IconButton>
            </Tooltip>
          </Stack>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Project
          </Button>
        </>
      )}
    </Toolbar>
  );
}
