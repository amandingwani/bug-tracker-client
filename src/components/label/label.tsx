import { forwardRef, ReactNode } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { StyledLabel } from './styles';

import { LabelVariant, LabelColor } from './labelSubTypes';
// ----------------------------------------------------------------------

interface LabelProps {
  children: ReactNode;
  color?: LabelColor;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: LabelVariant;
  sx?: React.CSSProperties;
}

// Don't use anonymous functions inside forwardRef (for React Dev Tool to work properly)
const Label = forwardRef<HTMLDivElement, LabelProps>(function Label(
  { children, color = 'default', variant = 'soft', startIcon, endIcon, sx, ...other },
  ref
) {
  const theme = useTheme();

  const iconStyles = {
    width: 16,
    height: 16,
    '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
  };

  return (
    <StyledLabel
      ref={ref}
      component="span"
      ownerState={{ color, variant }}
      sx={{
        ...(startIcon && { pl: 0.75 }),
        ...(endIcon && { pr: 0.75 }),
        ...sx,
      }}
      theme={theme}
      {...other}
    >
      {startIcon && <Box sx={{ mr: 0.75, ...iconStyles }}> {startIcon} </Box>}

      {children}

      {endIcon && <Box sx={{ ml: 0.75, ...iconStyles }}> {endIcon} </Box>}
    </StyledLabel>
  );
});

export default Label;
