import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';

// import Searchbar from './common/searchbar';
import Logo from 'src/components/logo';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
// import NotificationsPopover from './common/notifications-popover';

import { selectPage } from 'src/redux/slices/pageSlice';
import { useAppSelector } from 'src/redux/hooks';

// ----------------------------------------------------------------------

export default function Header({
  onOpenNav,
}: {
  onOpenNav: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const page = useAppSelector(selectPage);

  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <>
          <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButton>
          <Logo sx={{ mr: 1 }} withText={false} />
        </>
      )}

      <Box sx={{ mr: 1 }}>
        <Typography
          variant="h4"
          color={'text.primary'}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {page.header}
        </Typography>
      </Box>

      {/* Todo */}
      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <NotificationsPopover /> */}
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...((lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }) as React.CSSProperties),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
