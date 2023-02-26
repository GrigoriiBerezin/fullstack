import {useDispatch, useSelector} from "react-redux";
import {voteFor} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({anecdotes, filter}) => {
        return anecdotes.filter(a => a.content.includes(filter.value))
    })

    const vote = (id) => {
        dispatch(voteFor(id))
    }

    const byVotes = (a1, a2) => a2.votes - a1.votes

    return (
        <>
            {anecdotes.sort(byVotes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList
