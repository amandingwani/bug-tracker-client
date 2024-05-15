import { ProjectsState } from 'src/redux/types';

// tickets count by status
export type DashboardData = {
  activeProjects: number;
  activeTickets: number;
  ticketPriorityCount: {
    LOW: number;
    NORMAL: number;
    HIGH: number;
    URGENT: number;
  };
  ticketTypeCount: {
    BUG: number;
    TASK: number;
  };
  ticketStatusCount: {
    OPEN: number;
    IN_PROGRESS: number;
    TO_BE_TESTED: number;
    CLOSED: number;
  };
};

export function getDashboardData(projects: ProjectsState, userId: number): DashboardData {
  const data: DashboardData = {
    activeProjects: 0,
    activeTickets: 0,
    ticketPriorityCount: {
      LOW: 0,
      NORMAL: 0,
      HIGH: 0,
      URGENT: 0,
    },
    ticketTypeCount: {
      BUG: 0,
      TASK: 0,
    },
    ticketStatusCount: {
      OPEN: 0,
      IN_PROGRESS: 0,
      TO_BE_TESTED: 0,
      CLOSED: 0,
    },
  };

  const allProjects = [...projects.createdProjects, ...projects.otherProjects];

  allProjects.forEach((p) => {
    if (
      p.status === 'OPEN' ||
      p.status === 'IN_PROGRESS' ||
      p.status === 'TESTING' ||
      p.status === 'DEPLOYED'
    )
      data.activeProjects += 1;
    p.tickets.forEach((t) => {
      if (t.assignee?.id === userId) {
        if (t.status !== 'CLOSED') {
          data.activeTickets += 1;

          if (t.type === 'TASK') data.ticketTypeCount.TASK += 1;
          else data.ticketTypeCount.BUG += 1;

          if (t.priority === 'URGENT') data.ticketPriorityCount.URGENT += 1;
          else if (t.priority === 'HIGH') data.ticketPriorityCount.HIGH += 1;
          else if (t.priority === 'NORMAL') data.ticketPriorityCount.NORMAL += 1;
          else data.ticketPriorityCount.LOW += 1;

          if (t.status === 'OPEN') {
            data.ticketStatusCount.OPEN += 1;
          } else if (t.status === 'IN_PROGRESS') {
            data.ticketStatusCount.IN_PROGRESS += 1;
          } else if (t.status === 'TO_BE_TESTED') {
            data.ticketStatusCount.TO_BE_TESTED += 1;
          }
        } else {
          data.ticketStatusCount.CLOSED += 1;
        }
      }
    });
  });
  return data;
}
