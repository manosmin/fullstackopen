import React, { useRef, useEffect } from "react";
import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

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

  if (!user.username)
    return <Container>You must be logged in to see blog data.</Container>;

  return (
    <Container>
      <h1>Blogs</h1>
      <Togglable buttonLabel="New blog" ref={showFormRef}>
        <BlogForm showFormRef={showFormRef} />
      </Togglable>
      <div>
        <ListGroup>
          {blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
};
