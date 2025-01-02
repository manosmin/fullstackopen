import Togglable from "../components/Togglable";
import { useRef } from "react";

const Blog = ({ blog }) => {
  const viewBlogRef = useRef();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <h3>{blog.title}</h3>
      <Togglable buttonLabel="View blog" ref={viewBlogRef}>
        <p>
          <strong>Author: </strong>
          {blog.author}
        </p>
        <p>
          <strong>URL: </strong>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          <strong>Likes: </strong>
          {blog.likes}
          <button>Like</button>
        </p>
      </Togglable>
    </div>
  );
};

export default Blog;
