import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userReducer from 'src/redux/slices/userSlice'
import projectsReducer from 'src/redux/slices/projectsSlice'
import pageReducer from 'src/redux/slices/pageSlice'
import miscReducer from 'src/redux/slices/miscSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectsReducer,
        page: pageReducer,
        misc: miscReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
