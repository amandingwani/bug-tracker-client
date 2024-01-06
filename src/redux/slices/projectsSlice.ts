import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState, AppThunk } from 'src/redux/store'
import type { AddContributor, Project, ProjectCreateInput, ProjectsState, ProjectUpdate, Ticket, TicketCreateInput, TicketUpdate } from '../types'
import {
    getProjects,
    createProject,
    createTicket,
    updateProject as updateProjectApi,
    deleteProject as deleteProjectApi,
    updateTicket as updateTicketApi,
    deleteTicket as deleteTicketApi,
    addContributor as addContributorApi,
    removeContributor as removeContributorApi
} from 'src/services/projects'
import { UseFormReset } from 'react-hook-form'

// Define the initial state using that type
const initialState: ProjectsState = {
    createdProjects: [],
    otherProjects: [],
    status: 'idle'
}

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId: number) => {
    return await deleteProjectApi(projectId)
})

export const deleteTicket = createAsyncThunk('projects/deleteTicket', async (ticketId: number) => {
    return await deleteTicketApi(ticketId)
})

export const addContributor = createAsyncThunk('projects/addContributor', async (data: AddContributor) => {
    return await addContributorApi(data)
})

export const removeContributor = createAsyncThunk('projects/removeContributor', async (data: AddContributor) => {
    return await removeContributorApi(data)
})

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
            if (project) {
                project.name = action.payload.name;
                project.description = action.payload.description;
                project.status = action.payload.status;
            }
        },
        setCreatedTicket: (state, action: PayloadAction<Ticket>) => {
            state.createdProjects.find(p => p.id === action.payload.project.id)?.tickets.push(action.payload)
            state.otherProjects.find(p => p.id === action.payload.project.id)?.tickets.push(action.payload)
        },
        updateTicket: (state, action: PayloadAction<Ticket>) => {
            let project = state.createdProjects.find(p => p.id === action.payload.project.id);
            if (!project) {
                project = state.otherProjects.find(p => p.id === action.payload.project.id)
            }
            const ticket = project?.tickets.find(t => t.id === action.payload.id)
            if (ticket) {
                ticket.title = action.payload.title;
                ticket.description = action.payload.description;
                ticket.type = action.payload.type;
                ticket.priority = action.payload.priority;
                ticket.status = action.payload.status;
                ticket.project = action.payload.project;
                ticket.assignee = action.payload.assignee;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(deleteTicket.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteTicket.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = undefined
                // Delete the ticket from the state
                let project = state.createdProjects.find(p => p.id === action.payload.project.id);
                if (!project)
                    project = state.otherProjects.find(p => p.id === action.payload.project.id)
                if (project)
                    project.tickets = project.tickets.filter(t => t.id !== action.payload.id)
            })
            .addCase(deleteTicket.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(deleteProject.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = undefined
                // Delete the project from the state
                state.createdProjects = state.createdProjects.filter(p => p.id !== action.payload.id);
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addContributor.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addContributor.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = undefined
                // Update the contributors array
                const project = state.createdProjects.find(p => p.id === action.payload.id);
                if (project)
                    project.contributors = action.payload.contributors;
            })
            .addCase(addContributor.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(removeContributor.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(removeContributor.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.error = undefined
                // Update the contributors array
                const project = state.createdProjects.find(p => p.id === action.payload.id);
                if (project)
                    project.contributors = action.payload.contributors;
            })
            .addCase(removeContributor.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
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
                    priority: 'NORMAL',
                    assignee: undefined,
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
                    priority: 'NORMAL',
                    assignee: undefined,
                })
            })
            .catch((err) => { throw err });
    }
}

export const { setProjects, setCreatedProject, setCreatedTicket, updateProject, updateTicket } = projectsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProjects = (state: RootState) => state.projects
export const selectStatus = (state: RootState) => state.projects.status
export const selectError = (state: RootState) => state.projects.error
export const selectProject = (state: RootState, projectId: number) => {
    const allProjects = [...state.projects.createdProjects, ...state.projects.otherProjects]
    return allProjects.find(p => p.id === projectId)
}

export default projectsSlice.reducer