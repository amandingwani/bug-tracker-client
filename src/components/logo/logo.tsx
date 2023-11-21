import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link, { LinkProps } from '@mui/material/Link';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

interface LogoProps {
  disabledLink?: boolean;
  sx?: SxProps<Theme>;
  [other: string]: any;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = (
      <Box
        component="img"
        src="/favicon/android-chrome-512x512.png"
        sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
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
