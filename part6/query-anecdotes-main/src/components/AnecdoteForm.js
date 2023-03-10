import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAneMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const _content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAneMutation.mutate({
      content: _content,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0
    })
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
