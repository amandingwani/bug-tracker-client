import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userReducer from 'src/redux/slices/userSlice'
import counterReducer from 'src/redux/slices/counterSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
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
