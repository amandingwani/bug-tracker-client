import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

import { Ticket, TicketStatusMap } from 'src/redux/types';

import TicketDetails from '../ticket-details';
import TicketInfoWidget from '../ticket-info-widget';
import Iconify from 'src/components/iconify';
import { Box, SxProps, Theme } from '@mui/material';

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

  return (
    <Container maxWidth="xl" sx={sx}>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={12} sm={6} md={3} sx={{ pb: 2, pt: 2 }}>
          {ticket ? (
            renderType
          ) : (
            <Skeleton variant="rounded" width={'100%'}>
              {renderType}
            </Skeleton>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ pb: 2, pt: 2 }}>
          {ticket ? (
            renderPriority
          ) : (
            <Skeleton variant="rounded" width={'100%'}>
              {renderPriority}
            </Skeleton>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ pb: 2, pt: 2 }}>
          {ticket ? (
            renderStatus
          ) : (
            <Skeleton variant="rounded" width={'100%'}>
              {renderStatus}
            </Skeleton>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          {ticket ? (
            renderDetails
          ) : (
            <Skeleton variant="rounded" width="100%">
              <Box sx={{ pt: '40%' }}></Box>
            </Skeleton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
