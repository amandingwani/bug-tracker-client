import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState, AppThunk } from 'src/redux/store'
import type { ProjectsState } from '../types'
import { getProjects } from 'src/services/projects'

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
    }
})

export const loadProjects = (): AppThunk => {
    return (dispatch) => {
        getProjects()
            .then((projects) => dispatch(setProjects(projects)))
            .catch((err) => { throw err });
    }
}

export const { setProjects } = projectsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProjects = (state: RootState) => state.projects

export default projectsSlice.reducer