import {useMutation, useQueryClient} from "react-query";
import {addAnecdote} from "../requests";

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const addAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: (newNote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newNote))
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
