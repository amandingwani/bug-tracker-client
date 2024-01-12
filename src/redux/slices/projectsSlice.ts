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
    removeContributor as removeContributorApi,
    CreateTicketApiData,
    UpdateTicketApiData
} from 'src/services/projects'
import { UseFormReset } from 'react-hook-form'
import { unassignedUser } from '../constants'
import { updateAndShowNotification } from './notificationSlice'

// Define the initial state using that type
const initialState: ProjectsState = {
    createdProjects: [],
    otherProjects: [],
    reqStatus: {
        name: '',
        status: "idle"
    }
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
        setReqStatus: (state, action: PayloadAction<ProjectsState["reqStatus"]>) => {
            state.reqStatus = action.payload;
        },
        setError: (state, action: PayloadAction<ProjectsState["error"]>) => {
            state.error = action.payload;
        },
        resetProjects: () => initialState,
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
        removeOtherProject: (state, action: PayloadAction<{ projectId: number }>) => {
            state.otherProjects = state.otherProjects.filter(p => p.id !== action.payload.projectId);
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
                state.reqStatus = {
                    name: 'deleteTicket',
                    status: 'loading'
                }
            })
            .addCase(deleteTicket.fulfilled, (state, action) => {
                state.reqStatus = {
                    name: 'deleteTicket',
                    status: 'succeeded'
                }
                state.error = undefined
                // Delete the ticket from the state
                let project = state.createdProjects.find(p => p.id === action.payload.project.id);
                if (!project)
                    project = state.otherProjects.find(p => p.id === action.payload.project.id)
                if (project)
                    project.tickets = project.tickets.filter(t => t.id !== action.payload.id)
            })
            .addCase(deleteTicket.rejected, (state, action) => {
                state.reqStatus = {
                    name: 'deleteTicket',
                    status: 'failed'
                }
                state.error = action.error.message
            })
            .addCase(deleteProject.pending, (state, action) => {
                state.reqStatus = {
                    name: 'deleteProject',
                    status: 'loading'
                }
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.reqStatus = {
                    name: 'deleteProject',
                    status: 'succeeded'
                }
                state.error = undefined
                // Delete the project from the state
                state.createdProjects = state.createdProjects.filter(p => p.id !== action.payload.id);
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.reqStatus = {
                    name: 'deleteProject',
                    status: 'failed'
                }
                state.error = action.error.message
            })
            .addCase(addContributor.pending, (state, action) => {
                state.reqStatus = {
                    name: 'addContributor',
                    status: 'loading'
                }
            })
            .addCase(addContributor.fulfilled, (state, action) => {
                state.reqStatus = {
                    name: 'addContributor',
                    status: 'succeeded'
                }
                state.error = undefined
                // Update the contributors array
                const project = state.createdProjects.find(p => p.id === action.payload.id);
                if (project)
                    project.contributors = action.payload.contributors;
            })
            .addCase(addContributor.rejected, (state, action) => {
                state.reqStatus = {
                    name: 'addContributor',
                    status: 'failed'
                }
                state.error = action.error.message
            })
            .addCase(removeContributor.pending, (state, action) => {
                state.reqStatus = {
                    name: 'removeContributor',
                    status: 'loading'
                }
            })
            .addCase(removeContributor.fulfilled, (state, action) => {
                state.reqStatus = {
                    name: 'removeContributor',
                    status: 'succeeded'
                }
                state.error = undefined
                // Update the contributors array
                const project = state.createdProjects.find(p => p.id === action.payload.id);
                if (project)
                    project.contributors = action.payload.contributors;
            })
            .addCase(removeContributor.rejected, (state, action) => {
                state.reqStatus = {
                    name: 'removeContributor',
                    status: 'failed'
                }
                state.error = action.error.message
            })
    }
})

export const loadProjects = (): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setReqStatus({ name: 'loadProjects', status: 'loading' }));
            const data = await getProjects();
            dispatch(setReqStatus({ name: 'loadProjects', status: 'succeeded' }));
            dispatch(setProjects(data))
            dispatch(setReqStatus({ name: '', status: 'idle' }));
        } catch (error) {
            dispatch(setReqStatus({ name: 'loadProjects', status: 'failed' }));
            // dispatch(setError(error as string))
            dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error', noClose: true }))
        }
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
            .catch((err) => {
                setLoading(false)
                dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error' }))
            });
    }
}

export const createAndLoadTicket = (data: CreateTicketApiData, setLoading: React.Dispatch<React.SetStateAction<boolean>>, closeDrawer: () => void, reset: UseFormReset<TicketCreateInput>): AppThunk => {
    return (dispatch) => {
        createTicket(data)
            .then((ticket) => {
                dispatch(setCreatedTicket(ticket))
                setLoading(false)
                reset({
                    title: '',
                    description: '',
                    status: 'OPEN',
                    type: 'BUG',
                    priority: 'NORMAL',
                });
                closeDrawer();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
                dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error' }))
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
            .catch((err) => {
                setLoading(false)
                dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error' }))
            });
    }
}

export const updateAndLoadTicket = (data: UpdateTicketApiData, setLoading: React.Dispatch<React.SetStateAction<boolean>>, closeDrawer: () => void, reset: UseFormReset<TicketCreateInput>): AppThunk => {
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
                });
            })
            .catch((err) => {
                setLoading(false)
                dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error' }))
            });
    }
}

export const { setProjects, setReqStatus, setError, resetProjects, setCreatedProject, setCreatedTicket, updateProject, updateTicket, removeOtherProject } = projectsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProjects = (state: RootState) => state.projects
export const selectReqStatus = (state: RootState) => state.projects.reqStatus
export const selectError = (state: RootState) => state.projects.error
export const selectProject = (state: RootState, projectId: number) => {
    const allProjects = [...state.projects.createdProjects, ...state.projects.otherProjects]
    return allProjects.find(p => p.id === projectId)
}

export default projectsSlice.reducer