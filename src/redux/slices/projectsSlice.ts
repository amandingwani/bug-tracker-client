import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState, AppThunk } from 'src/redux/store'
import type { Project, ProjectCreateInput, ProjectsState, ProjectUpdate, Ticket, TicketCreateInput, TicketUpdate } from '../types'
import { getProjects, createProject, createTicket, updateProject as updateProjectApi, updateTicket as updateTicketApi } from 'src/services/projects'
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
        updateTicket: (state, action: PayloadAction<Ticket>) => {
            let project = state.createdProjects.find(p => p.id === action.payload.projectId);
            if (!project) {
                project = state.otherProjects.find(p => p.id === action.payload.projectId)
            }
            const ticket = project?.tickets.find(t => t.id === action.payload.id)
            if (ticket) {
                ticket.title = action.payload.title;
                ticket.description = action.payload.description;
                ticket.type = action.payload.type;
                ticket.priority = action.payload.priority;
                ticket.status = action.payload.status;
                ticket.projectId = action.payload.projectId;
            }
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

export const createAndLoadTicket = (data: TicketCreateInput, setLoading: React.Dispatch<React.SetStateAction<boolean>>, closeDrawer: () => void, reset: UseFormReset<TicketCreateInput>): AppThunk => {
    return (dispatch) => {
        createTicket(data)
            .then((ticket) => {
                dispatch(setCreatedTicket(ticket))
                setLoading(false)
                closeDrawer();
                reset({
                    title: '',
                    description: '',
                    status: 'OPEN',
                    type: 'BUG',
                    priority: 'NORMAL'
                })
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

export const updateAndLoadTicket = (data: TicketUpdate, setLoading: React.Dispatch<React.SetStateAction<boolean>>, closeDrawer: () => void, reset: UseFormReset<TicketCreateInput>): AppThunk => {
    return (dispatch) => {
        updateTicketApi(data)
            .then((ticket) => {
                dispatch(updateTicket(ticket))
                setLoading(false)
                closeDrawer();
                reset({
                    title: '',
                    description: '',
                    status: 'OPEN',
                    type: 'BUG',
                    priority: 'NORMAL'
                })
            })
            .catch((err) => { throw err });
    }
}


export const { setProjects, setCreatedProject, setCreatedTicket, updateProject, updateTicket } = projectsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProjects = (state: RootState) => state.projects

export default projectsSlice.reducer