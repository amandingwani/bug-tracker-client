import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState, AppThunk } from 'src/redux/store'
import type { AddContributor, Project, ProjectCreateInput, ProjectsState, ProjectStatus, ProjectUpdate, Ticket, TicketCreateInput, TicketUpdate } from '../types'
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
import { updateAndShowNotification } from './notificationSlice'
import { generateAddProjectApiResponse, projects } from 'src/_mock/projects'
import { faker } from '@faker-js/faker'
import { generateAddTicketPartialApiResponse } from 'src/_mock/tickets'

// Define the initial state using that type
const initialState: ProjectsState = {
    createdProjects: [],
    otherProjects: [],
    reqStatus: {
        name: '',
        status: "idle"
    }
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
        updateProject: (state, action: PayloadAction<Project | { id: number, name: string, description: string, status: ProjectStatus }>) => {
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
        deleteProject: (state, action: PayloadAction<Project | { id: number }>) => {
            // Delete the project from the state
            state.createdProjects = state.createdProjects.filter(p => p.id !== action.payload.id);
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
        deleteTicket: (state, action: PayloadAction<Ticket | { id: number, project: { id: number } }>) => {
            // Delete the ticket from the state
            let project = state.createdProjects.find(p => p.id === action.payload.project.id);
            if (!project)
                project = state.otherProjects.find(p => p.id === action.payload.project.id)
            if (project)
                project.tickets = project.tickets.filter(t => t.id !== action.payload.id)
        },
        updateContributor: (state, action: PayloadAction<Project>) => {
            // Update the contributors array
            const project = state.createdProjects.find(p => p.id === action.payload.id);
            if (project)
                project.contributors = action.payload.contributors;
        },
        demoAddContributor: (state, action: PayloadAction<AddContributor>) => {
            // Update the contributors array
            const project = state.createdProjects.find(p => p.id === action.payload.id);
            if (project) {
                project.contributors.push({
                    id: faker.number.int({ min: 10000, max: 99999 }),
                    firstName: action.payload.email.split('@')[0],
                    email: action.payload.email,
                    registered: false
                })
            }
        },
        demoRemoveContributor: (state, action: PayloadAction<AddContributor>) => {
            // Update the contributors array
            const project = state.createdProjects.find(p => p.id === action.payload.id);
            if (project)
                project.contributors = project.contributors.filter(c => c.email !== action.payload.email);
        },
        demoSetCreatedTicket: (state, action: PayloadAction<Ticket>) => {
            // find the project under which ticket was created
            let project = state.createdProjects.find(p => p.id === action.payload.project.id)
            if (!project) {
                project = state.otherProjects.find(p => p.id === action.payload.project.id)
            }

            if (project) {
                const newTicket = action.payload;
                // assignee
                if (newTicket.assignee) {
                    // if self assigned
                    if (newTicket.assignee.id === newTicket.author.id) {
                        newTicket.assignee = newTicket.author
                    } else {
                        newTicket.assignee = project.contributors.find(c => c.id === newTicket.assignee?.id)
                    }
                }
                // project
                newTicket.project.name = project.name
                newTicket.project.owner = project.owner
                newTicket.project.contributors = project.contributors

                project.tickets.push(newTicket)
            }
        },
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

export const loadDemoProjects = (): AppThunk => {
    return (dispatch) => {
        const data: ProjectsState = {
            ...projects,
            reqStatus: {
                name: '',
                status: 'idle'
            }
        }
        dispatch(setProjects(data))
    }
}

export const createAndLoadProject = (data: ProjectCreateInput, setLoading: React.Dispatch<React.SetStateAction<boolean>>, closeDrawer: () => void, reset: UseFormReset<ProjectCreateInput>): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const user = getState().auth.user;
            let project: Project;
            if (user?.id === -1) {
                project = generateAddProjectApiResponse(data);
            } else {
                project = await createProject(data)
            }
            dispatch(setCreatedProject(project))
            dispatch(updateAndShowNotification({ severity: 'success', message: 'Project created!' }))
            setLoading(false)
            closeDrawer();
            reset({
                name: '',
                description: '',
                status: 'OPEN'
            })
        } catch (error) {
            setLoading(false)
            dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error' }))
        }
    }
}

export const createAndLoadTicket = (data: CreateTicketApiData, setLoading: React.Dispatch<React.SetStateAction<boolean>>, closeDrawer: () => void, reset: UseFormReset<TicketCreateInput>): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const user = getState().auth.user;
            if (user?.id === -1) {
                const ticket = generateAddTicketPartialApiResponse(data);
                dispatch(demoSetCreatedTicket(ticket))
            } else {
                const ticket = await createTicket(data)
                dispatch(setCreatedTicket(ticket))
            }
            dispatch(updateAndShowNotification({ severity: 'success', message: 'Ticket created!' }))
            setLoading(false)
            reset({
                title: '',
                description: '',
                status: 'OPEN',
                type: 'BUG',
                priority: 'NORMAL',
            });
            closeDrawer();
        } catch (error) {
            setLoading(false)
            dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error' }))
        }
    }
}

export const updateAndLoadProject = (data: ProjectUpdate, setLoading: React.Dispatch<React.SetStateAction<boolean>>, closeDrawer: () => void, reset: UseFormReset<ProjectCreateInput>): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const user = getState().auth.user;
            if (user?.id === -1) {
                dispatch(updateProject(data))
            } else {
                const project = await updateProjectApi(data)
                dispatch(updateProject(project))
            }
            dispatch(updateAndShowNotification({ severity: 'success', message: 'Project updated!' }))
            setLoading(false)
            closeDrawer();
            reset({
                name: '',
                description: '',
                status: 'OPEN'
            })
        } catch (error) {
            setLoading(false)
            dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error' }))
        }
    }
}

export const updateAndLoadTicket = (data: UpdateTicketApiData, setLoading: React.Dispatch<React.SetStateAction<boolean>>, closeDrawer: () => void, reset: UseFormReset<TicketCreateInput>): AppThunk => {
    return (dispatch) => {
        updateTicketApi(data)
            .then((ticket) => {
                dispatch(updateTicket(ticket))
                dispatch(updateAndShowNotification({ severity: 'success', message: 'Ticket updated!' }))
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

export const deleteTicketThunk = (ticket: { id: number, project: { id: number } }, onSuccess?: () => void): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(setReqStatus({ name: 'deleteTicket', status: 'loading' }));
            const user = getState().auth.user;
            if (user?.id === -1) {
                dispatch(setReqStatus({ name: 'deleteTicket', status: 'succeeded' }));
                dispatch(deleteTicket({ id: ticket.id, project: { id: ticket.project.id } }))
            } else {
                const data = await deleteTicketApi(ticket.id)
                dispatch(setReqStatus({ name: 'deleteTicket', status: 'succeeded' }));
                dispatch(deleteTicket(data))
            }
            dispatch(setReqStatus({ name: '', status: 'idle' }));
            dispatch(updateAndShowNotification({ severity: 'success', message: 'Ticket deleted!' }))
            if (onSuccess)
                onSuccess();
        } catch (error) {
            dispatch(setReqStatus({ name: 'deleteTicket', status: 'failed' }));
            dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error' }))
        }
    }
}

export const deleteProjectThunk = (projectId: number, onSuccess?: () => void): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(setReqStatus({ name: 'deleteProject', status: 'loading' }));
            const user = getState().auth.user;
            if (user?.id === -1) {
                dispatch(setReqStatus({ name: 'deleteProject', status: 'succeeded' }));
                dispatch(deleteProject({ id: projectId }))
            } else {
                const data = await deleteProjectApi(projectId)
                dispatch(setReqStatus({ name: 'deleteProject', status: 'succeeded' }));
                dispatch(deleteProject(data))
            }
            dispatch(setReqStatus({ name: '', status: 'idle' }));
            dispatch(updateAndShowNotification({ severity: 'success', message: 'Project deleted!' }))
            if (onSuccess)
                onSuccess();
        } catch (error) {
            dispatch(setReqStatus({ name: 'deleteProject', status: 'failed' }));
            dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error' }))
        }
    }
}

export const addContributorThunk = (data: AddContributor, onSuccess?: () => void, onError?: () => void): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(setReqStatus({ name: 'addContributor', status: 'loading' }));
            const user = getState().auth.user;
            if (user?.id === -1) {
                dispatch(setReqStatus({ name: 'addContributor', status: 'succeeded' }));
                dispatch(demoAddContributor(data))
            } else {
                const resData = await addContributorApi(data)
                dispatch(setReqStatus({ name: 'addContributor', status: 'succeeded' }));
                dispatch(updateContributor(resData))
            }
            dispatch(setReqStatus({ name: '', status: 'idle' }));
            dispatch(updateAndShowNotification({ severity: 'success', message: 'User added!' }))
            if (onSuccess)
                onSuccess();
        } catch (error) {
            dispatch(setReqStatus({ name: 'addContributor', status: 'failed' }));
            dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error' }))
            if (onError)
                onError();
        }
    }
}

export const removeContributorThunk = (data: AddContributor, onSuccess?: () => void): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(setReqStatus({ name: 'removeContributor', status: 'loading' }));
            const user = getState().auth.user;
            if (user?.id === -1) {
                dispatch(setReqStatus({ name: 'removeContributor', status: 'succeeded' }));
                dispatch(demoRemoveContributor(data))
            } else {
                const resData = await removeContributorApi(data)
                dispatch(setReqStatus({ name: 'removeContributor', status: 'succeeded' }));
                dispatch(updateContributor(resData))
            }
            dispatch(setReqStatus({ name: '', status: 'idle' }));
            if (onSuccess)
                onSuccess();
        } catch (error) {
            dispatch(setReqStatus({ name: 'removeContributor', status: 'failed' }));
            dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error' }))
        }
    }
}

export const { demoSetCreatedTicket, demoAddContributor, demoRemoveContributor, setProjects, setReqStatus, setError, resetProjects, setCreatedProject, setCreatedTicket, updateProject, deleteProject, updateTicket, removeOtherProject, deleteTicket, updateContributor } = projectsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProjects = (state: RootState) => state.projects
export const selectReqStatus = (state: RootState) => state.projects.reqStatus
export const selectError = (state: RootState) => state.projects.error
export const selectProject = (state: RootState, projectId: number) => {
    const allProjects = [...state.projects.createdProjects, ...state.projects.otherProjects]
    return allProjects.find(p => p.id === projectId)
}

export default projectsSlice.reducer