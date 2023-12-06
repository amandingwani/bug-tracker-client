import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link, { LinkProps } from '@mui/material/Link';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

interface LogoProps {
  disabledLink?: boolean;
  withText?: boolean;
  sx?: SxProps<Theme>;
}

// eslint-disable-next-line
const Logo = forwardRef<HTMLAnchorElement, LogoProps>(
  ({ disabledLink = false, withText = true, sx }, ref) => {
    // const theme = useTheme();

    // const PRIMARY_LIGHT = theme.palette.primary.light;

    // const PRIMARY_MAIN = theme.palette.primary.main;

    // const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = withText ? (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          ...sx,
        }}
      >
        <Box
          component="img"
          src="/favicon/android-chrome-512x512.png"
          sx={{ width: 40, height: 40 }}
        />
        <Box component="text" sx={{ ml: 2 }}>
          <Typography variant="h4">{'Bug Ninja'}</Typography>
        </Box>
      </Box>
    ) : (
      <Box
        component="img"
        src="/favicon/android-chrome-512x512.png"
        sx={{ width: 36, height: 36, cursor: 'pointer', ...sx }}
      />
    );

    if (disabledLink) {
      return logo;
    }

    const linkProps: LinkProps = {
      component: RouterLink,
      href: '/',
      sx: { display: 'contents' },
    };

    return <Link {...linkProps}>{logo}</Link>;
  }
);

export default Logo;
