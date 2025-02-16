import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import userService from "./services/users";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const showFormRef = useRef();
  const loginFormRef = useRef();

  useEffect(() => {
    if (userInfo) {
      blogService.setAuthToken(userInfo.token);
      dispatch(initializeBlogs());
    }
  }, [userInfo]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (storedUsername && storedToken) {
      setUserInfo({
        username: JSON.parse(storedUsername),
        token: JSON.parse(storedToken),
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    userService
      .login({ username, password })
      .then((response) => {
        setUserInfo({ username: response.username, token: response.token });
        localStorage.setItem("username", JSON.stringify(response.username));
        localStorage.setItem("token", JSON.stringify(response.token));
        dispatch(setNotification(`Hello ${response.username}!`, "success"));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          dispatch(setNotification(error.response.data.error, "error"));
        } else {
          console.error("Error logging in:", error.response.data.error);
        }
      });
  };

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    dispatch(setNotification("Log out successful!", "success"));
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {!userInfo ? (
        <Togglable buttonLabel="Login" ref={loginFormRef}>
          <LoginForm
            handleSubmit={handleSubmit}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            {userInfo.username} is logged in
            <button style={{ marginLeft: 8 }} onClick={handleLogout}>
              Log out
            </button>
          </p>
          <Togglable buttonLabel="New blog" ref={showFormRef}>
            <BlogForm showFormRef={showFormRef} />
          </Togglable>
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} userInfo={userInfo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
