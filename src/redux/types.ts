// These types are not the same as their backend counterparts

export type Contributor = {
    id: number,
    firstName: string,
    lastName?: string,
    email: string,
    registered: boolean
}

// export type ProjectInfoForTicket = {
//     id: number,
//     name: string,
//     owner: Contributor;
//     tickets: Ticket[];  
//     contributors: Contributor[];
// }

export interface UserState {
    id: number
    google_id_sub: string
    email: string
    firstName: string
    lastName?: string
    picture?: string
    createdAt: Date
}

export interface ProjectsState {
    createdProjects: Project[],
    otherProjects: Project[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error?: string
}

export interface Project {
    id: number;
    name: string;
    description?: string;
    owner: Contributor;
    status: ProjectStatus;
    tickets: Ticket[];
    createdAt: Date;
    contributors: Contributor[];
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
    project: Project
}

export type ProjectStatus = 'OPEN' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELED' | 'TESTING' | 'DEPLOYED'
export const ProjectStatusMap = {
    'OPEN': 'OPEN',
    'IN_PROGRESS': 'IN PROGRESS',
    'ON_HOLD': 'ON HOLD',
    'COMPLETED': 'COMPLETED',
    'CANCELED': 'CANCELED',
    'TESTING': 'TESTING',
    'DEPLOYED': 'DEPLOYED'
}

export const TicketTypeArr = ['BUG', 'TASK'] as const
export type TicketType = typeof TicketTypeArr[number]

export const TicketPriorityArr = ['URGENT', 'HIGH', 'NORMAL', 'LOW'] as const
export type TicketPriority = typeof TicketPriorityArr[number]

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'TO_BE_TESTED' | 'CLOSED'
export const TicketStatusMap = {
    'OPEN': 'OPEN',
    'IN_PROGRESS': 'IN PROGRESS',
    'TO_BE_TESTED': 'TO BE TESTED',
    'CLOSED': 'CLOSED'
}

export interface ProjectCreateInput {
    name: string,
    description: string;
    status: ProjectStatus;
}

export interface ProjectUpdate extends ProjectCreateInput {
    id: number
}

export type TicketCreateInput = {
    title: string;
    description?: string;
    type: TicketType;
    priority: TicketPriority;
    status: TicketStatus;
    project: Project,
    assignee: Contributor | null;
}

export interface TicketUpdate extends TicketCreateInput {
    id: number
}

export interface AddContributor {
    id: number,
    email: string
}

export type Email = {
    email: string
}