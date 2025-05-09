import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import { TicketsView } from 'src/sections/tickets/view';

import { updateHeader } from 'src/redux/slices/pageSlice';
import { useAppDispatch } from 'src/redux/hooks';
import Link from '@mui/material/Link';
import { RouterLink } from 'src/routes/components';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Iconify from 'src/components/iconify';
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function TicketsPage() {
  const titleString = 'Tickets';
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const breadcrumbs = [
    <Link
      component={RouterLink}
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 1,
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.text.secondary, 0.16),
        },
      }}
    >
      <Iconify icon="ic:round-home" />
    </Link>,
    <Typography key="2" color="text.primary">
      Tickets
    </Typography>,
  ];

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
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          {breadcrumbs}
        </Breadcrumbs>
        <TicketsView sx={{ mt: 2 }} projectView={false} filter={searchParams.get('filter')} />
      </Container>
    </>
  );
}
