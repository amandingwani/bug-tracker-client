import { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

interface AppWidgetSummaryProps {
  title: string;
  value?: string;
  sx?: SxProps<Theme>;
  icon: string | React.ReactNode;
  color?: string;
  valueLoading?: boolean;
  handleActionMenuClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function AppWidgetSummary({
  title,
  value,
  icon,
  color = '#ffffff',
  sx,
  valueLoading,
  handleActionMenuClick,
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
        {valueLoading ? (
          <Skeleton animation="wave" variant="text" />
        ) : (
          <Box data-field={title.toLowerCase()} onClick={handleActionMenuClick}>
            <Typography
              sx={{
                cursor: handleActionMenuClick ? (valueLoading ? 'default' : 'pointer') : 'default',
              }}
              variant="h4"
            >
              {value}
            </Typography>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
