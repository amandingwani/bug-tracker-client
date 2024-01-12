import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState, AppThunk } from 'src/redux/store'
import type { AuthState, UserState } from '../types'
import { loadProjects, resetProjects } from './projectsSlice'
import { loginWithGoogle } from 'src/services/auth'
import getProfile from 'src/services/profile';
import { resetHeader } from './pageSlice'
import { hideNotification, updateAndShowNotification } from './notificationSlice'

const initialState: AuthState = {
    user: null,
    welcomeBackMsg: ", Welcome back",
    reqStatus: {
        name: '',
        status: "idle"
    }
}

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload
            state.error = undefined
            state.reqStatus = {
                name: '',
                status: "idle"
            }
        },
        resetAuth: () => initialState,
        hideWelcomeBackMsg: (state) => {
            state.welcomeBackMsg = ''
        },
        setReqStatus: (state, action: PayloadAction<AuthState["reqStatus"]>) => {
            state.reqStatus = action.payload;
        },
        setError: (state, action: PayloadAction<AuthState["error"]>) => {
            state.error = action.payload;
        },
    }
})

export const autoLogin = (): AppThunk => {
    return (dispatch) => {
        getProfile()
            .then((userData) => {
                dispatch(setUser(userData))
                localStorage.setItem("BUG_NINJA_USER", JSON.stringify(userData));
                dispatch(loadProjects());
            })
            .catch((error) => {
                // console.log(error)
            });
    }
}

export const googleLogin = (code: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setReqStatus({ name: 'googleLogin', status: 'loading' }));
            const data = await loginWithGoogle(code);
            dispatch(setReqStatus({ name: 'googleLogin', status: 'succeeded' }));
            dispatch(setUser(data.user));
            localStorage.setItem("BUG_NINJA_USER", JSON.stringify(data.user));
            if (data.status === 201) {
                dispatch(hideWelcomeBackMsg());
            }
            dispatch(loadProjects());
        } catch (error) {
            console.log(error)
            dispatch(setReqStatus({ name: 'googleLogin', status: 'failed' }));
            // dispatch(setError(error as string))
            dispatch(updateAndShowNotification({ severity: 'error', message: 'Internal Server Error' }))
            dispatch(setReqStatus({ name: '', status: 'idle' }));
        }
    }
}

export const logout = (): AppThunk => {
    return (dispatch) => {
        document.cookie = 'token=; expires=Session; path=/;';
        dispatch(resetAuth())
        dispatch(hideNotification())
        localStorage.removeItem("BUG_NINJA_USER");
        localStorage.removeItem("BUG_NINJA_PAGE_HEADER");
        dispatch(resetProjects())
        dispatch(resetHeader())
        // // clear the token cookie
        // clearToken()
        //     .then(() => {
        //         dispatch(resetAuth())
        //         localStorage.removeItem("BUG_NINJA_USER");
        //         localStorage.removeItem("BUG_NINJA_PAGE_HEADER");
        //         dispatch(resetProjects())
        //         dispatch(resetHeader())
        //     })
        //     .catch((err) => { throw err });
    }
}

export const { setUser, resetAuth, hideWelcomeBackMsg, setReqStatus, setError } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user
export const selectWelcomeBackMsg = (state: RootState) => state.auth.welcomeBackMsg
export const selectReqStatus = (state: RootState) => state.auth.reqStatus
export const selectError = (state: RootState) => state.auth.error

export default authSlice.reducer