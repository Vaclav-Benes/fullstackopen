import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.aneForm.value
        e.target.aneForm.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <div>
            <h2>Anecdote form</h2>
            <form onSubmit={addAnecdote}>
                <input name='aneForm' />
                <button>create</button>
            </form>
        </div>
    )

}

export default AnecdoteForm