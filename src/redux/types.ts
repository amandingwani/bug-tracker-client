// These types are not the same as their backend counterparts

export type Contributor = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  registered: boolean;
};

export interface UserState {
  id: number;
  google_id_sub: string;
  email: string;
  firstName: string;
  lastName?: string;
  picture?: string;
  createdAt: string;
}

export interface AuthState {
  user: UserState | null;
  welcomeBackMsg: '' | ', Welcome back';
  reqStatus: {
    name: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
  };
  error?: string;
}

export interface ProjectsState {
  createdProjects: Project[];
  otherProjects: Project[];
  reqStatus: {
    name: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
  };
  error?: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  owner: Contributor;
  status: ProjectStatus;
  tickets: Ticket[];
  createdAt: string;
  contributors: Contributor[];
}

export interface ProjectUnderTicket {
  id: number;
  name: string;
  contributors: Contributor[];
  owner: Contributor;
}

export interface Ticket {
  id: number;
  title: string;
  description?: string;
  author: Contributor;

  assignee?: Contributor;

  type: TicketType;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  project: ProjectUnderTicket;
}

export const ProjectStatusArr = [
  'OPEN',
  'IN_PROGRESS',
  'ON_HOLD',
  'COMPLETED',
  'CANCELED',
  'TESTING',
  'DEPLOYED',
] as const;
export type ProjectStatus = (typeof ProjectStatusArr)[number];
// export type ProjectStatus = 'OPEN' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELED' | 'TESTING' | 'DEPLOYED'
export const ProjectStatusMap = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN PROGRESS',
  ON_HOLD: 'ON HOLD',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
  TESTING: 'TESTING',
  DEPLOYED: 'DEPLOYED',
};

export const TicketTypeArr = ['BUG', 'TASK'] as const;
export type TicketType = (typeof TicketTypeArr)[number];

export const TicketPriorityArr = ['URGENT', 'HIGH', 'NORMAL', 'LOW'] as const;
export type TicketPriority = (typeof TicketPriorityArr)[number];

export const TicketStatusArr = ['OPEN', 'IN_PROGRESS', 'TO_BE_TESTED', 'CLOSED'] as const;
export type TicketStatus = (typeof TicketStatusArr)[number];
export const TicketStatusMap = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN PROGRESS',
  TO_BE_TESTED: 'TO BE TESTED',
  CLOSED: 'CLOSED',
};

export interface ProjectCreateInput {
  name: string;
  description: string;
  status: ProjectStatus;
}

export interface ProjectUpdate extends ProjectCreateInput {
  id: number;
}

export type TicketCreateInput = {
  title: string;
  description?: string;
  type: TicketType;
  priority: TicketPriority;
  status: TicketStatus;
  project: ProjectUnderTicket;
  assignee: Contributor;
};

export interface TicketUpdate extends TicketCreateInput {
  id: number;
}

export interface AddContributor {
  id: number;
  email: string;
}

export type Email = {
  email: string;
};
