import {addAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";
import {setInfo} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const anecdote = await anecdoteService.createAnecdote(content)
        dispatch(addAnecdote(anecdote))
        setInfo(`Anecdote ${content} has been created`)(dispatch)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
