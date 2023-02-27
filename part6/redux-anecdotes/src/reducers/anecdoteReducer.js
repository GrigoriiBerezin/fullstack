import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const slice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
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

const actions = slice.actions

export const addAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createAnecdote(content)
        dispatch(actions.appendAnecdote(newAnecdote))
    }
}

export const voteFor = id => {
    return async dispatch => {
        await anecdoteService.voteFor(id)
        dispatch(actions.voteFor(id))
    }
}

export const initAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(actions.setAnecdotes(anecdotes))
    }
}

export default slice.reducer
