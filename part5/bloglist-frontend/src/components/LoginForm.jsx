import { useState, useRef } from "react";
import { login, logout } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import Togglable from "../components/Togglable";

function LoginForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginFormRef = useRef();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setNotification("Log out successful!", "success"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ username, password }));
      dispatch(setNotification(`Hello ${username}!`, "success"));
    } catch (error) {
      dispatch(setNotification(`Error logging in. ${error.message}`, "error"));
    }
  };

  return !user.username ? (
    <Togglable buttonLabel="Login" ref={loginFormRef}>
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
    </Togglable>
  ) : (
    <div>
      <p>
        {user.username} is logged in
        <button style={{ marginLeft: 8 }} onClick={handleLogout}>
          Log out
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
