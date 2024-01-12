import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from 'src/redux/slices/authSlice'
import projectsReducer from 'src/redux/slices/projectsSlice'
import pageReducer from 'src/redux/slices/pageSlice'
import notificationSlice from "src/redux/slices/notificationSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectsReducer,
        page: pageReducer,
        notification: notificationSlice
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
