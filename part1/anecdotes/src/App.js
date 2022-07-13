import { useState } from 'react'

const Anecdote = ({ text, votes }) => {
  return (
    <>
      <p> {text} </p>
      <p> Number of votes: {votes} </p>
    </>
  )
}

const BestAnecdote = ({ anecdotes, votes }) => {
  const mostVotes = Math.max(...votes);
  const index = votes.indexOf(mostVotes);

  if (mostVotes === 0) {
    return (
      <>
        <h3>No votes yet.</h3>
      </>
    )
  }

  return(
    <Anecdote text={anecdotes[index]} votes={votes[index]} />
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const voteAnecdote = () => {
    let votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  return (
    <div>

      <h1>Judge this anecdote</h1>

      <Anecdote
        text={anecdotes[selected]}
        votes={votes[selected]}
      />

      <button onClick={voteAnecdote} >Vote</button>

      <button onClick={() => { setSelected(Math.floor(Math.random() * anecdotes.length)) }}>
        Next anecdote
      </button>

      <h1>Best anecdote</h1>

      <BestAnecdote anecdotes={anecdotes} votes={votes} />

    </div>
  )
}

export default App