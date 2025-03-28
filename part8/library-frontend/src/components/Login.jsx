import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import queries from "../queries";

const Login = ({ show, setError, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(queries.LOGIN, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
      setTimeout(() => setError(null), 3000);
    },
  });

  if (!show) {
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    login({ variables: { username: username, password: password } })
      .then((result) => {
        if (result.data) {
          localStorage.setItem("token", result.data.login.value);
          setToken(result.data.login.value);
        }
      })
      .catch((error) => console.error(error));
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Login </h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
