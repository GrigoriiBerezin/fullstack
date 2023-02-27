import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        addAnecdote(state, action) {
            state.push(action.payload)
        },
        voteFor(state, action) {
            return state.map(a => a.id === action.payload ? {...a, votes: a.votes + 1} : a)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { addAnecdote, voteFor, setAnecdotes } = slice.actions

export default slice.reducer
