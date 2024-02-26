import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Ticket, TicketStatusMap } from 'src/redux/types';

import TicketDetails from '../ticket-details';
import TicketInfoWidget from '../ticket-info-widget';
import Iconify from 'src/components/iconify';
import { SxProps, Theme } from '@mui/material';
import {
  getTicketPriorityLabelColor,
  getTicketStatusLabelColor,
  getTicketTypeLabelColor,
} from 'src/utils/getColor';

// ----------------------------------------------------------------------

export default function TicketDetailsPage({ ticket, sx }: { ticket?: Ticket; sx: SxProps<Theme> }) {
  const theme = useTheme();

  const renderType = (
    <TicketInfoWidget
      title="Type"
      value={ticket?.type}
      color={
        ticket ? alpha(theme.palette[getTicketTypeLabelColor(ticket.type)].main, 0.1) : undefined
      }
      icon={<Iconify icon="iconoir:plug-type-l" sx={{ width: 64, height: 64 }} />}
    />
  );
  const renderPriority = (
    <TicketInfoWidget
      title="Priority"
      value={ticket?.priority}
      color={
        ticket
          ? alpha(theme.palette[getTicketPriorityLabelColor(ticket.priority)].main, 0.1)
          : undefined
      }
      icon={<Iconify icon="iconoir:priority-up" sx={{ width: 64, height: 64 }} />}
    />
  );
  const renderStatus = (
    <TicketInfoWidget
      title="Status"
      value={ticket ? TicketStatusMap[ticket.status] : undefined}
      color={
        ticket
          ? alpha(theme.palette[getTicketStatusLabelColor(ticket.status)].main, 0.1)
          : undefined
      }
      icon={<Iconify icon="pajamas:status" sx={{ width: 64, height: 64 }} />}
    />
  );
  const renderDetails = <TicketDetails title="Ticket Details" ticket={ticket} />;

  const infoWidgetSkeleton = <Skeleton variant="rounded" height={144}></Skeleton>;
  const detailsSkeleton = <Skeleton variant="rounded" height={500}></Skeleton>;

  return (
    <Grid container spacing={3} sx={{ justifyContent: 'space-between', ...sx }}>
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ pt: 2 }}>
        {ticket ? (
          <Card sx={{ backgroundColor: alpha(theme.palette.primary.light, 0.3) }}>
            <CardContent>
              <Stack direction={'row'} alignContent={'center'} spacing={3}>
                <Box sx={{ width: 64, height: 64 }}>
                  <Iconify icon="ion:ticket-outline" sx={{ width: 64, height: 64 }} />
                </Box>
                <Stack direction={'column'} alignContent={'center'}>
                  <Typography variant="subtitle2" sx={{ color: 'text.disabled' }} gutterBottom>
                    Ticket Title
                  </Typography>
                  <Typography variant="h4" component="div">
                    {ticket.title}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ) : (
          <Skeleton variant="rounded" height={70} />
        )}
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ pt: 2 }}>
        {ticket ? renderType : infoWidgetSkeleton}
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ pt: 2 }}>
        {ticket ? renderPriority : infoWidgetSkeleton}
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ pt: 2 }}>
        {ticket ? renderStatus : infoWidgetSkeleton}
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12}>
        {ticket ? renderDetails : detailsSkeleton}
      </Grid>
    </Grid>
  );
}
