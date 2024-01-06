import axios from 'src/config/axios';
import { ProjectCreateInput, ProjectsState, Project, Ticket, ProjectUpdate, TicketUpdate, AddContributor, TicketPriority, TicketStatus, TicketType } from 'src/redux/types';

export const getProjects = () => {
    return new Promise<ProjectsState>((resolve, reject) => {
        axios
            .get('/projects')
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
};

export const createProject = (data: ProjectCreateInput) => {
    return new Promise<Project>((resolve, reject) => {
        axios
            .post('/projects', data)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
}

export const updateProject = (data: ProjectUpdate) => {
    return new Promise<Project>((resolve, reject) => {
        axios
            .put('/projects', data)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
}

export const deleteProject = (projectId: number) => {
    return new Promise<Project>((resolve, reject) => {
        axios
            .delete('/projects', { data: { id: projectId } })
            .then((res) => {
                console.log({ res })
                if (res.data.error) {
                    reject(res.data.error)
                } else {
                    resolve(res.data)
                }
            })
            .catch((err) => {
                console.log({ 'errCaught': err })
                reject(err)
            });
    });
}

export type CreateTicketApiData = {
    title: string;
    description?: string;
    type: TicketType;
    priority: TicketPriority;
    status: TicketStatus;
    projectId: number;
    assigneeId?: number;
}

export const createTicket = (data: CreateTicketApiData) => {
    return new Promise<Ticket>((resolve, reject) => {
        axios
            .post('/tickets', data)
            .then((res) => {
                if (res.data.error) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
            .catch((err) => reject(err));
    });
}

export const updateTicket = (data: TicketUpdate) => {
    return new Promise<Ticket>((resolve, reject) => {
        axios
            .put('/tickets', data)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
}

export const deleteTicket = (ticketId: number) => {
    return new Promise<Ticket>((resolve, reject) => {
        axios
            .delete('/tickets', { data: { id: ticketId } })
            .then((res) => {
                console.log({ res })
                if (res.data.error) {
                    reject(res.data.error)
                } else {
                    resolve(res.data)
                }
            })
            .catch((err) => {
                console.log({ 'errCaught': err })
                reject(err)
            });
    });
}

export const addContributor = (data: AddContributor) => {
    return new Promise<Project>((resolve, reject) => {
        axios
            .put('/projects/addContributor', data)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
}

export const removeContributor = (data: AddContributor) => {
    return new Promise<Project>((resolve, reject) => {
        axios
            .put('/projects/removeContributor', data)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
}