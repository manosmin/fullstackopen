function LoginForm({
  handleSubmit,
  username,
  password,
  setUsername,
  setPassword,
}) {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input id="login-button" type="submit" />
      </form>
    </div>
  );
}

export default LoginForm;
