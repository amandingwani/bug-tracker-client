import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

interface UsersTableToolbarProps {
  filterName: string;
  onFilterName?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onAddUserClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function UsersTableToolbar({
  filterName,
  onFilterName,
  onAddUserClick,
}: UsersTableToolbarProps) {
  const isXs = useResponsive('only', 'xs');

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
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      </Stack>
      {onAddUserClick &&
        (isXs ? (
          <IconButton
            aria-label="Add User"
            onClick={onAddUserClick}
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
            onClick={onAddUserClick}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add User
          </Button>
        ))}
    </Toolbar>
  );
}
