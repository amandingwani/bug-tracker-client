import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Ticket, TicketStatusMap } from 'src/redux/types';

import TicketDetails from '../ticket-details';
import TicketInfoWidget from '../ticket-info-widget';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function TicketDetailsPage({ ticket }: { ticket?: Ticket }) {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={12} sm={6} md={3} sx={{ pb: 2, pt: 2 }}>
          <TicketInfoWidget
            title="Type"
            value={ticket?.type}
            color="success"
            icon={<Iconify icon="iconoir:plug-type-l" sx={{ width: 64, height: 64 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ pb: 2, pt: 2 }}>
          <TicketInfoWidget
            title="Priority"
            value={ticket?.priority}
            color="success"
            icon={<Iconify icon="iconoir:priority-up" sx={{ width: 64, height: 64 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ pb: 2, pt: 2 }}>
          <TicketInfoWidget
            title="Status"
            value={ticket ? TicketStatusMap[ticket.status] : undefined}
            color="success"
            icon={<Iconify icon="pajamas:status" sx={{ width: 64, height: 64 }} />}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TicketDetails title="Ticket Details" ticket={ticket} />
        </Grid>
      </Grid>
    </Container>
  );
}
