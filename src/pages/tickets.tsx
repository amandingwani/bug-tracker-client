import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { TicketsView } from 'src/sections/tickets/view';

import { updateHeader } from 'src/redux/slices/pageSlice';
import { useAppDispatch } from 'src/redux/hooks';

// ----------------------------------------------------------------------

export default function TicketsPage() {
  const titleString = 'Tickets';
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateHeader(titleString));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title> {titleString} | Bug Ninja </title>
      </Helmet>

      <TicketsView />
    </>
  );
}
