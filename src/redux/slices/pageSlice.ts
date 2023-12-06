import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "src/redux/store"

export interface PageState {
    header: string
}

const initialState: PageState = {
    header: "Dashboard"
}

export const pageSlice = createSlice({
    name: "page",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        updateHeader: (state, action: PayloadAction<string>) => {
            state.header = action.payload
        },
    }
})

export const { updateHeader } = pageSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPage = (state: RootState) => state.page;

export default pageSlice.reducer
