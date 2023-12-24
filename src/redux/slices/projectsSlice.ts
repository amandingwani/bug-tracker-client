import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState, AppThunk } from 'src/redux/store'
import type { Project, ProjectCreateInput, ProjectsState, ProjectUpdate, Ticket, TicketCreateInput } from '../types'
import { getProjects, createProject, createTicket, updateProject as updateProjectApi } from 'src/services/projects'
import { UseFormReset } from 'react-hook-form'

// Define the initial state using that type
const initialState: ProjectsState = {
    createdProjects: [],
    otherProjects: []
}

export const projectsSlice = createSlice({
    name: 'projects',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setProjects: (state, action: PayloadAction<ProjectsState>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        setCreatedProject: (state, action: PayloadAction<Project>) => {
            state.createdProjects.push(action.payload)
        },
        updateProject: (state, action: PayloadAction<Project>) => {
            let project = state.createdProjects.find(p => p.id === action.payload.id);
            if (!project) {
                project = state.otherProjects.find(p => p.id === action.payload.id)
            }
            project!.name = action.payload.name;
            project!.description = action.payload.description;
            project!.status = action.payload.status;
        },
        setCreatedTicket: (state, action: PayloadAction<Ticket>) => {
            state.createdProjects.find(p => p.id === action.payload.projectId)?.tickets.push(action.payload)
            state.otherProjects.find(p => p.id === action.payload.projectId)?.tickets.push(action.payload)
        },
    }
})

export const loadProjects = (): AppThunk => {
    return (dispatch) => {
        getProjects()
            .then((projects) => dispatch(setProjects(projects)))
            .catch((err) => { throw err });
    }
}

export const createAndLoadProject = (data: ProjectCreateInput, setLoading: React.Dispatch<React.SetStateAction<boolean>>, closeDrawer: () => void, reset: UseFormReset<ProjectCreateInput>): AppThunk => {
    return (dispatch) => {
        createProject(data)
            .then((project) => {
                dispatch(setCreatedProject(project))
                setLoading(false)
                closeDrawer();
                reset({
                    name: '',
                    description: '',
                    status: 'OPEN'
                })
            })
            .catch((err) => { throw err });
    }
}

export const createAndLoadTicket = (data: TicketCreateInput, setLoading: React.Dispatch<React.SetStateAction<boolean>>, closeDrawer: () => void): AppThunk => {
    return (dispatch) => {
        createTicket(data)
            .then((ticket) => {
                dispatch(setCreatedTicket(ticket))
                setLoading(false)
                closeDrawer();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            });
    }
}

export const updateAndLoadProject = (data: ProjectUpdate, setLoading: React.Dispatch<React.SetStateAction<boolean>>, closeDrawer: () => void, reset: UseFormReset<ProjectCreateInput>): AppThunk => {
    return (dispatch) => {
        updateProjectApi(data)
            .then((project) => {
                dispatch(updateProject(project))
                setLoading(false)
                closeDrawer();
                reset({
                    name: '',
                    description: '',
                    status: 'OPEN'
                })
            })
            .catch((err) => { throw err });
    }
}

export const { setProjects, setCreatedProject, setCreatedTicket, updateProject } = projectsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProjects = (state: RootState) => state.projects

export default projectsSlice.reducer