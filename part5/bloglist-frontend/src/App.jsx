import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import userService from "./services/users";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const showFormRef = useRef();
  const loginFormRef = useRef();

  useEffect(() => {
    if (userInfo) {
      blogService.setAuthToken(userInfo.token);
      blogService
        .getAll()
        .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
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
        setMessage({ text: `Hello ${response.username}!`, type: "success" });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setMessage({
            text: error.response.data.error,
            type: "error",
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        } else {
          console.error("Error logging in:", error.response.data.error);
        }
      });
  };

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setMessage({ text: "Log out successful!", type: "success" });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div>
      <h1>Blogs</h1>
      {message && <Notification message={message} />}
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
            <BlogForm
              showFormRef={showFormRef}
              setBlogs={setBlogs}
              setMessage={setMessage}
            />
          </Togglable>
          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                blogs={blogs}
                setBlogs={setBlogs}
                setMessage={setMessage}
                userInfo={userInfo}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
