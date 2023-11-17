import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState, AppThunk } from 'src/redux/store'
import type { UserState } from '../types'
import { clearToken } from 'src/services/auth'

// Define the initial state using that type
const initialState: UserState = {}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setUser: (state, action: PayloadAction<UserState>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        removeUser: () => {
            return {}
        }
    }
})

export const logout = (): AppThunk => {
    return (dispatch) => {
        // clear the token cookie
        clearToken()
            .then(() => dispatch(removeUser()))
            .catch((err) => { throw err });
    }
}

export const { setUser, removeUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer