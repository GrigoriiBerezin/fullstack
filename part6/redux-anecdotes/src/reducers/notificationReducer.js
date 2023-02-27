import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'notification',
    initialState: 'Initial state',
    reducers: {
        changeNotification(state, action) {
            return action.payload
        }
    }
})

export const { changeNotification } = slice.actions

export default slice.reducer
