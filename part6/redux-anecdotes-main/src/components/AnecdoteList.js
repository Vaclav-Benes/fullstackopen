import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if ( filter === null ) {
          return anecdotes
        }
        const regex = new RegExp( filter, 'i' )
        return anecdotes.filter(anecdote => anecdote.content.match(regex))
      })

    return (
        anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : 1).map(_ane =>
            <Anecdote
                key={_ane.id}
                anecdote={_ane}
                handleClick={() => {
                    dispatch(vote(_ane))
                    dispatch(setNotification('You liked "' + _ane.content + '"!', 5))
                }}
            />
        )
    )
}

export default AnecdoteList