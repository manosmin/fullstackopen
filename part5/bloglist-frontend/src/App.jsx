import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { Blogs } from "./components/Blogs";
import Blog from "./components/Blog";
import User from "./components/User";
import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Users } from "./components/Users";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  const menu = {
    backgroundColor: "lightgray",
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  };

  return (
    <div style={menu}>
      <div>
        <Link style={padding} to="/users">
          Users
        </Link>
        <Link style={padding} to="/">
          Blogs
        </Link>
      </div>
      <LoginForm />
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  return (
    <Router>
      <div>
        <Menu />
        <Notification />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
