import { useState, useRef } from "react";
import { login, logout } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import Togglable from "../components/Togglable";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LoginForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginFormRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setNotification("Log out successful!", "success"));
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ username, password }));
      dispatch(setNotification(`Hello ${username}!`, "success"));
      navigate("/");
    } catch (error) {
      dispatch(setNotification(`Error logging in. ${error.message}`, "danger"));
    }
  };

  return !user.username ? (
    <div>
      <Togglable buttonLabel="Login" ref={loginFormRef}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className="text-light">Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="text-light">Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
          <Button id="login-button" variant="light" type="submit">
            Submit
          </Button>
        </Form>
      </Togglable>
    </div>
  ) : (
    <div>
      <span style={{ color: "white" }}>{user.username} is logged in</span>
      <Button style={{ marginLeft: 12 }} variant="light" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
}

export default LoginForm;
