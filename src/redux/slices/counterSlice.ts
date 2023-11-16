import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "src/redux/store"

export interface CounterState {
    value: number
    status: "idle" | "loading" | "failed"
}

const initialState: CounterState = {
    value: 0,
    status: "idle",
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    }
})

export const { incrementByAmount } = counterSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer
