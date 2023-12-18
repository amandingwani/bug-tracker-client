import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { selectUser } from 'src/redux/slices/authSlice';
import { useAppSelector } from 'src/redux/hooks';
import { Ticket, TicketStatusMap } from 'src/redux/types';

import TicketDetails from '../ticket-details';
import TicketInfoWidget from '../ticket-info-widget';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function TicketDetailsPage({ ticket }: { ticket: Ticket }) {
  const user = useAppSelector(selectUser);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} sx={{ justifyContent: 'space-around' }}>
        <Grid xs={12} sm={6} md={3} sx={{ p: 2 }}>
          <TicketInfoWidget
            title="Type"
            value={ticket.type}
            color="success"
            icon={<Iconify icon="iconoir:plug-type-l" sx={{ width: 64, height: 64 }} />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4} sx={{ p: 2 }}>
          <TicketInfoWidget
            title="Priority"
            value={ticket.priority}
            color="success"
            icon={<Iconify icon="iconoir:priority-up" sx={{ width: 64, height: 64 }} />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4} sx={{ p: 2 }}>
          <TicketInfoWidget
            title="Status"
            value={TicketStatusMap[ticket.status]}
            color="success"
            icon={<Iconify icon="pajamas:status" sx={{ width: 64, height: 64 }} />}
          />
        </Grid>
      </Grid>
      <TicketDetails title="Ticket Details" ticket={ticket} />
    </Container>
  );
}
