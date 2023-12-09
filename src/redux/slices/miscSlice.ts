import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "src/redux/store"

type WelcomeBackMsgType = "" | ", Welcome back"

export interface MiscState {
    welcomeBackMsg: WelcomeBackMsgType
}

const initialState: MiscState = {
    welcomeBackMsg: ", Welcome back"
}

export const miscSlice = createSlice({
    name: "misc",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setWelcomeBackMsg: (state, action: PayloadAction<WelcomeBackMsgType>) => {
            state.welcomeBackMsg = action.payload
        },
    }
})

export const { setWelcomeBackMsg } = miscSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMisc = (state: RootState) => state.misc

export default miscSlice.reducer
