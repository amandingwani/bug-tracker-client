import { forwardRef } from 'react';
import { Icon, IconifyIcon } from '@iconify/react';

import Box, { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

type IconifyProps = {
  icon: IconifyIcon | string;
  width?: number;
  sx?: BoxProps['sx'];
};

const Iconify = forwardRef<HTMLDivElement, IconifyProps>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

export default Iconify;
