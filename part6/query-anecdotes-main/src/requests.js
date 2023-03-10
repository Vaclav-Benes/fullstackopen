import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAne => axios.post(baseUrl, newAne).then(res => res.data)

export const updateAne = updatedAne => axios.put(`${baseUrl}/${updatedAne.id}`, updatedAne).then(res => res.data)