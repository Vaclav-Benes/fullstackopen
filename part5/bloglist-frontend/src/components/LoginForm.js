import React from 'react'
import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const _handleLogin = (event) => {
    event.preventDefault()
    handleLogin({
      username, password
    })
    setUsername('')
    setPassword('')
  }

  const formStyle = {
    textAlign: 'center'
  }

  const formStyleP = {
    margin: 0,
    marginTop: '15px'
  }

  const formStyleBtn = {
    marginTop: '10px'
  }

  return (
    <form onSubmit={_handleLogin} style={formStyle}>
      <div>
        <p style={formStyleP}>
          Username
        </p>
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <p style={formStyleP}>
          Password
        </p>
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit" style={formStyleBtn}>Login</button>
    </form>
  )
}

export default LoginForm