import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { TicketDetailsView } from 'src/sections/ticketDetails/view';

import { updateHeader } from 'src/redux/slices/pageSlice';
import { selectProjects } from 'src/redux/slices/projectsSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

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

      <TicketDetailsView ticket={ticket} />
    </>
  );
}
