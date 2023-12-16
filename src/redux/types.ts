// These types are not the same as their backend counterparts

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
    otherProjects: Project[]
}

export interface Project {
    id: number;
    name: string;
    description?: string;
    owner: string;
    status: ProjectStatus;
    createdAt: Date;
}

export interface Ticket {
    id: number;
    title: string;
    description?: string;
    author: string;
    asignee?: string;
    type?: TicketType;
    priority?: TicketPriority;
    status: TicketStatus;
    createdAt: Date;
    projectId: number;
}

export type ProjectStatus = 'OPEN' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELED' | 'TESTING' | 'DEPLOYED'
export type TicketType = 'BUG' | 'TASK'
export type TicketPriority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW'
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'TO_BE_TESTED' | 'CLOSED'