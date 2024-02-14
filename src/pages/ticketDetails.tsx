import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import { TicketDetailsView } from 'src/sections/ticketDetails/view';

import { updateHeader } from 'src/redux/slices/pageSlice';
import { selectProjects } from 'src/redux/slices/projectsSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import Link from '@mui/material/Link';
import { RouterLink } from 'src/routes/components';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Iconify from 'src/components/iconify';
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function TicketDetailsPage() {
  const { projectId, ticketId } = useParams();
  const tId = parseInt(ticketId!);
  const pId = parseInt(projectId!);
  const projects = useAppSelector(selectProjects);

  const project =
    projects.createdProjects.find((p) => p.id === pId) ||
    projects.otherProjects.find((p) => p.id === pId);

  const ticket = project?.tickets.find((t) => t.id === tId);

  let headerString: string | null = null;
  if (ticket) headerString = `${ticket.project.name} : ${ticket.title}`;

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
    <Link component={RouterLink} underline="hover" key="2" color="inherit" href="/projects">
      Projects
    </Link>,
    <Link
      component={RouterLink}
      underline="hover"
      key="2"
      color="inherit"
      href={`/projects/${project?.id}`}
    >
      {project?.name}
    </Link>,
    <Typography key="2" color="text.primary">
      Ticket
    </Typography>,
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (headerString) {
      dispatch(updateHeader(headerString));
      localStorage.setItem('BUG_NINJA_PAGE_HEADER', headerString);
    }
  }, [dispatch, headerString]);

  return (
    <>
      <Helmet>
        <title> Ticket | Bug Ninja </title>
      </Helmet>
      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          {breadcrumbs}
        </Breadcrumbs>
        <TicketDetailsView ticket={ticket} sx={{ mt: 2 }} />
      </Container>
    </>
  );
}
