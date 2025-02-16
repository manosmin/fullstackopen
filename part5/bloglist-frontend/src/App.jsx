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
  return (
    <div>
      <Link style={padding} to="/users">
        Users
      </Link>
      <Link style={padding} to="/">
        Blogs
      </Link>
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
        <LoginForm />
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
