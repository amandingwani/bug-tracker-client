import axios from 'src/config/axios';
import { ProjectsState } from 'src/redux/types';

export const getProjects = () => {
    return new Promise<ProjectsState>((resolve, reject) => {
        axios
            .get('/projects')
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
};
