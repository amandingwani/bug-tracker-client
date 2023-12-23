import Container from '@mui/material/Container';
// import { projects } from 'src/_mock/projects';

import ProjectDetails from '../project-details';

import { Project } from 'src/redux/types';

import { TicketsView } from 'src/sections/tickets/view';

// ----------------------------------------------------------------------

export default function ProjectDetailsPage({ project }: { project: Project }) {
  const allTickets = project.tickets;

  return (
    <Container>
      <ProjectDetails title="Project Details" project={project} />

      <TicketsView tickets={allTickets} filterSelected={{ assign: true, created: true }} />
    </Container>
  );
}
