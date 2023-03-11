import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {

  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAneMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      console.log(error);
      dispatch({ type: 'NEW_NOTIFICATION', payload: error.response.data.error })
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION', payload: '' })
      }, 5000)
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

    dispatch({ type: 'NEW_NOTIFICATION', payload: 'Created: "' + _content + '"' })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION', payload: '' })
    }, 5000)
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
