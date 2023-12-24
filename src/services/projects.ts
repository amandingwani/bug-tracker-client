import axios from 'src/config/axios';
import { ProjectCreateInput, ProjectsState, Project, TicketCreateInput, Ticket, ProjectUpdate } from 'src/redux/types';

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

export const createTicket = (data: TicketCreateInput) => {
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