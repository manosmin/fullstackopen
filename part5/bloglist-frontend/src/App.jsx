import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import userService from "./services/users";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (userInfo) {
      blogService.setAuthToken(userInfo.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
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

  if (userInfo === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        {message && <Notification message={message} />}
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
    );
  }

  return (
    <div>
      <div>
        {localStorage.getItem("username")} is logged in
        <button style={{ marginLeft: 8 }} onClick={handleLogout}>
          Log out
        </button>
      </div>
      <h1>blogs</h1>
      {message && <Notification message={message} />}
      <BlogForm setBlogs={setBlogs} setMessage={setMessage} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
