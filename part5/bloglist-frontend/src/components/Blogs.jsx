import React, { useRef, useEffect } from "react";
import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";

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

  if (!user.username) return <div>You must be logged in to see blog data.</div>;

  return (
    <div>
      <h1>Blogs</h1>
      <Togglable buttonLabel="New blog" ref={showFormRef}>
        <BlogForm showFormRef={showFormRef} />
      </Togglable>
      <div>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
