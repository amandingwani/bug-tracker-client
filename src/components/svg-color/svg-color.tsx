import { forwardRef, HTMLAttributes } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------
type SvgColorProps = {
  src: string;
  sx?: BoxProps['sx'];
} & HTMLAttributes<HTMLSpanElement>;

const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(({ src, sx, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

export default SvgColor;
