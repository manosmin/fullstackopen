import React, { useRef, useEffect } from "react";
import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import Blog from "../components/Blog";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { logout } from "../reducers/userReducer";
import { initializeBlogs } from "../reducers/blogReducer";
import blogService from "../services/blogs";

export const Blogs = () => {
  const dispatch = useDispatch();
  const showFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.token) {
      blogService.setAuthToken(user.token);
      dispatch(initializeBlogs());
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setNotification("Log out successful!", "success"));
  };

  if (!user.username) return;

  return (
    <div>
      <p>
        {user.username} is logged in
        <button style={{ marginLeft: 8 }} onClick={handleLogout}>
          Log out
        </button>
      </p>
      <Togglable buttonLabel="New blog" ref={showFormRef}>
        <BlogForm showFormRef={showFormRef} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};
