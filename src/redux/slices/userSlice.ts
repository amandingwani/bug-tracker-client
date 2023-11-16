import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'src/redux/store'
import type { UserState } from '../types'

// Define the initial state using that type
const initialState: UserState = {
    id: null,
    google_id_sub: null,
    email: null,
    firstName: null,
    lastName: null,
    picture: null
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setUser: (state: UserState, action: PayloadAction<UserState>) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { setUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer