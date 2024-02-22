import { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

interface AppWidgetSummaryProps {
  title: string;
  value?: string;
  sx?: SxProps<Theme>;
  icon: string | React.ReactNode;
  color?: string;
}

export default function AppWidgetSummary({
  title,
  value,
  icon,
  color = '#ffffff',
  sx,
  ...other
}: AppWidgetSummaryProps) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      height={{ xs: 100, sm: 144 }}
      display={'flex'}
      alignItems={'center'}
      sx={{
        px: 3,
        borderRadius: 2,
        backgroundColor: color,
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

      <Stack spacing={0.5} direction={'column'}>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </Stack>
    </Card>
  );
}
