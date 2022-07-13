import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ feedback }) => {

  if (feedback.all !== 0) {

    const average = (feedback.good - feedback.bad) / feedback.all
    const positive = feedback.good * (100 / feedback.all)

    return (
      <table>
        <tbody>
          <StatisticLine text="Good feedback: " value={feedback.good} />
          <StatisticLine text="Neutral feedback: " value={feedback.neutral} />
          <StatisticLine text="Bad feedback: " value={feedback.bad} />
          <StatisticLine text="Overall feedback: " value={feedback.all} />
          <StatisticLine text="Average feedback: " value={average} />
          <StatisticLine text="Positive feedback: " value={positive.toString() + ' %'} />
        </tbody>
      </table>
    )
  }
  return (
    <p>No feedback given.</p>
  )
}

const App = () => {

  const [feedback, setFeedback] = useState({
    good: 0, neutral: 0, bad: 0, all: 0
  })

  return (
    <div>
      <Header text="Customer feedback." />

      <Button onClick={() => setFeedback({ ...feedback, good: feedback.good + 1, all: feedback.all + 1 })} text='good' />
      <Button onClick={() => setFeedback({ ...feedback, neutral: feedback.neutral + 1, all: feedback.all + 1 })} text='neutral' />
      <Button onClick={() => setFeedback({ ...feedback, bad: feedback.bad + 1, all: feedback.all + 1 })} text='bad' />

      <Header text="Feedback statistics." />

      <Statistics feedback={feedback} />

    </div>
  )
}

export default App