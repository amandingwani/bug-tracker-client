import axios from 'src/config/axios';
import { ProjectCreateInput, ProjectsState, Project } from 'src/redux/types';

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