import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import { TicketsView } from 'src/sections/tickets/view';

import { updateHeader } from 'src/redux/slices/pageSlice';
import { useAppDispatch } from 'src/redux/hooks';

// ----------------------------------------------------------------------

export default function TicketsPage() {
  const titleString = 'Tickets';
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateHeader(titleString));
    localStorage.setItem('BUG_NINJA_PAGE_HEADER', titleString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title> {titleString} | Bug Ninja </title>
      </Helmet>

      <Container maxWidth="xl">
        <TicketsView />
      </Container>
    </>
  );
}
