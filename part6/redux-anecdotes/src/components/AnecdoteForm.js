import {addAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";
import {setInfo} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(setInfo(`Anecdote ${content} has been created`))
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
