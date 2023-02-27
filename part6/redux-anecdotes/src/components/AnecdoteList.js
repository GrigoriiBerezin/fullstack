import {useDispatch, useSelector} from "react-redux";
import {voteFor} from "../reducers/anecdoteReducer";
import {setInfo} from "../reducers/notificationReducer";

const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteFor(anecdote.id))
        dispatch(setInfo(`Vote for ${anecdote.content}`))
    }

    return (<div>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
        </div>
    </div>)
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        return anecdotes.filter(a => a.content.includes(filter))
    })

    const byVotes = (a1, a2) => a2.votes - a1.votes

    return (
        <>
            {anecdotes.sort(byVotes).map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)}
        </>
    )
}

export default AnecdoteList
