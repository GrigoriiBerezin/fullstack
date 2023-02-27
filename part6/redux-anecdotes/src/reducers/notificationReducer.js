import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        resetNotification() {
            return null
        }
    }
})

const { setNotification, resetNotification } = slice.actions

export const setInfo = (message, timeout = 3000) => {
    return async (dispatch) => {
        dispatch(setNotification(message))
        setTimeout(() => dispatch(resetNotification()), timeout)
    }
}

export default slice.reducer
