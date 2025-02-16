import React, { useRef, useEffect } from "react";
import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import Blog from "../components/Blog";
import { useDispatch, useSelector } from "react-redux";
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

  if (!user.username) return;

  return (
    <div>
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
