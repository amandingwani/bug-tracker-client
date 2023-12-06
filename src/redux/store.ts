import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userReducer from 'src/redux/slices/userSlice'
import pageReducer from 'src/redux/slices/pageSlice'
import counterReducer from 'src/redux/slices/counterSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        page: pageReducer,
        counter: counterReducer
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
