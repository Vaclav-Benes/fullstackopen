import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, updateAne } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useNotificationDispatch } from './NotificationContext'

const App = () => {

  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const updateAneMutation = useMutation(updateAne, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    updateAneMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })

    dispatch({type:'NEW_NOTIFICATION', payload: 'You liked: "'+ anecdote.content + '"'})
    setTimeout(()=>{
      dispatch({type:'HIDE_NOTIFICATION', payload: ''})
    },5000)
  }

  const result = useQuery('anecdotes', getAnecdotes)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if(result.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
