import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { Blogs } from "./components/Blogs";
import { useDispatch } from "react-redux";
import { initializeUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <LoginForm />
      <Blogs />
    </div>
  );
};

export default App;
