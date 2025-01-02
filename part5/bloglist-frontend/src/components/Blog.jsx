import Togglable from "../components/Togglable";
import { useRef } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
  const viewBlogRef = useRef();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = (blogId, currentLikes) => {
    blogService
      .updateLikes(blogId, { likes: currentLikes + 1 })
      .then((response) =>
        setBlogs(blogs.map((b) => (b.id === blogId ? response : b)))
      )
      .catch((error) => {
        console.error(error);
      });
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
          <button onClick={() => handleLike(blog.id, blog.likes)}>Like</button>
        </p>
      </Togglable>
    </div>
  );
};

export default Blog;
