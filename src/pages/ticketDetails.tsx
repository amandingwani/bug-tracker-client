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

  let titleString = 'Ticket';
  if (ticket) titleString = ticket.title;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateHeader(titleString));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title> Ticket | Bug Ninja </title>
      </Helmet>

      {ticket && <TicketDetailsView ticket={ticket} />}
    </>
  );
}
