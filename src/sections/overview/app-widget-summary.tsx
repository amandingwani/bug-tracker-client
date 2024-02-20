import { SxProps, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

interface AppWidgetSummaryProps {
  title: string;
  total?: number;
  sx?: SxProps<Theme>;
  icon: string | React.ReactNode;
  color?: string;
  href: string;
}

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = '#ffffff',
  sx,
  href,
  ...other
}: AppWidgetSummaryProps) {
  return (
    <Card sx={{ ...sx, backgroundColor: color }}>
      <CardActionArea component={RouterLink} href={href}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', height: { xs: 100, sm: 164 } }}>
          <Stack
            spacing={3}
            direction="row"
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            sx={{
              px: 3,
              borderRadius: 2,
            }}
            {...other}
          >
            {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

            <Stack direction={'column'} spacing={0.5}>
              <Typography variant="h4">{total}</Typography>

              <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                {title}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
