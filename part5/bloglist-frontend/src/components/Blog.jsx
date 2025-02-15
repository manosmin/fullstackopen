import Togglable from "../components/Togglable";
import { useRef } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, setMessage, userInfo }) => {
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
      .then((updatedBlog) => {
        setBlogs((prevBlogs) =>
          prevBlogs
            .map((b) => (b.id === blogId ? updatedBlog : b))
            .sort((a, b) => b.likes - a.likes),
        );
        setMessage({
          text: `Blog "${updatedBlog.title}" liked`,
          type: "success",
        });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setMessage({
          text: `Error liking blog: ${error.message}`,
          type: "error",
        });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
  };

  const removeBlog = (blogId, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      blogService
        .remove(blogId)
        .then(() => {
          setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blogId));
          setMessage({
            text: `Blog ${name} removed successfully`,
            type: "success",
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          setMessage({
            text: `Error removing blog: ${error.message}`,
            type: "error",
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };

  return (
    <div style={blogStyle} className="blog-item">
      <h3>{blog.title}</h3>
      <p>
        <strong>Author: </strong>
        {blog.author}
      </p>
      <Togglable buttonLabel="View blog" ref={viewBlogRef}>
        <p>
          <strong>URL: </strong>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          <strong>Likes: </strong>
          {blog.likes}
          <button
            className="blog-like-button"
            onClick={() => handleLike(blog.id, blog.likes)}
          >
            Like
          </button>
        </p>
        {blog.user.some((user) => user.username === userInfo.username) && (
          <button onClick={() => removeBlog(blog.id, blog.title)}>
            Remove
          </button>
        )}
      </Togglable>
    </div>
  );
};

export default Blog;
