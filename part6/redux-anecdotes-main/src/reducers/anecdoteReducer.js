import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: (anecdoteToChange.votes + 1)
      }
      return state.map(ane =>
        ane.id !== id ? ane : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const { voteFor, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch(voteFor(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer