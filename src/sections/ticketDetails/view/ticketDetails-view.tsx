import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Ticket, TicketStatusMap } from 'src/redux/types';

import TicketDetails from '../ticket-details';
import TicketInfoWidget from '../ticket-info-widget';
import Iconify from 'src/components/iconify';
import { SxProps, Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default function TicketDetailsPage({ ticket, sx }: { ticket?: Ticket; sx: SxProps<Theme> }) {
  const renderType = (
    <TicketInfoWidget
      title="Type"
      value={ticket?.type}
      color="success"
      icon={<Iconify icon="iconoir:plug-type-l" sx={{ width: 64, height: 64 }} />}
    />
  );
  const renderPriority = (
    <TicketInfoWidget
      title="Priority"
      value={ticket?.priority}
      color="success"
      icon={<Iconify icon="iconoir:priority-up" sx={{ width: 64, height: 64 }} />}
    />
  );
  const renderStatus = (
    <TicketInfoWidget
      title="Status"
      value={ticket ? TicketStatusMap[ticket.status] : undefined}
      color="success"
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
          <Card>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: 'text.disabled' }} gutterBottom>
                Ticket Title
              </Typography>
              <Typography variant="h5" component="div">
                {ticket.title}
              </Typography>
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
