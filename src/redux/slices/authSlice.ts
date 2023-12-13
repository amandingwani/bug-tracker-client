import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState, AppThunk } from 'src/redux/store'
import type { UserState } from '../types'
import { clearToken, loginWithGoogle } from 'src/services/auth'
import getProfile from 'src/services/profile';

type AuthState = {
    user: UserState | null,
    welcomeBackMsg: "" | ", Welcome back"
}

const initialState: AuthState = {
    user: null,
    welcomeBackMsg: ", Welcome back"
}

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = null
        },
        hideWelcomeBackMsg: (state) => {
            state.welcomeBackMsg = ''
        },
    }
})

export const autoLogin = (): AppThunk => {
    return (dispatch) => {
        getProfile()
            .then((userData) => {
                console.log({ profile: userData });
                dispatch(setUser(userData))
            })
            .catch((err) => { throw err });
    }
}

export const googleLogin = (code: string): AppThunk => {
    return (dispatch) => {
        loginWithGoogle(code)
            .then(({ user, status }) => {
                dispatch(
                    setUser(user)
                );
                if (status === 201) {
                    dispatch(hideWelcomeBackMsg());
                }
            })
            .catch((err) => { throw err });
    }
}

export const logout = (): AppThunk => {
    return (dispatch) => {
        // clear the token cookie
        clearToken()
            .then(() => dispatch(removeUser()))
            .catch((err) => { throw err });
    }
}

export const { setUser, removeUser, hideWelcomeBackMsg } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user
export const selectWelcomeBackMsg = (state: RootState) => state.auth.welcomeBackMsg

export default authSlice.reducer