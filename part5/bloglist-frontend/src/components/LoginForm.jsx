import React from 'react'

function LoginForm({ handleSubmit, username, password, setUsername, setPassword }) {
  return (
    <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" />
        </form>
      </div>
  )
}

export default LoginForm