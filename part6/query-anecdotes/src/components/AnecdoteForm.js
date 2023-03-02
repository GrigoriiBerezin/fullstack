import {useMutation, useQueryClient} from "react-query";
import {addAnecdote} from "../requests";
import {useNotify} from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  const addAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      notifyWith(`Anecdote '${newAnecdote.content}' was added`)
    },
    onError: (error) => {
      notifyWith(error.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    addAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
