import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { Blogs } from "./components/Blogs";
import Blog from "./components/Blog";
import User from "./components/User";
import { useDispatch } from "react-redux";
import { initializeUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Users } from "./components/Users";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Menu = () => {
  return (
    <Navbar bg="primary" data-bs-theme="light">
      <Container>
        <Navbar.Brand className="text-light">
          <h3>Blogs App</h3>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="text-light" as={Link} to="/users">
            Users
          </Nav.Link>
          <Nav.Link className="text-light" as={Link} to="/">
            Blogs
          </Nav.Link>
        </Nav>
        <LoginForm />
      </Container>
    </Navbar>
  );
};

const App = () => {
  const dispatch = useDispatch();

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
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
