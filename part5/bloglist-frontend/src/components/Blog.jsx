import Togglable from "../components/Togglable";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import {
  addLikeToBlog,
  deleteBlog,
  addCommentToBlog,
} from "../reducers/blogReducer";
import { useNavigate, useParams } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const viewBlogRef = useRef();
  const navigate = useNavigate();
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);
  const [comment, setComment] = useState("");

  if (!userInfo.username)
    return <div>You must be logged in to see blog data.</div>;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async (blog) => {
    try {
      await dispatch(addLikeToBlog(blog));
      dispatch(setNotification(`Blog "${blog.title}" liked`, "success"));
    } catch (error) {
      dispatch(setNotification(`Error liking blog. ${error.message}`, "error"));
    }
  };

  const removeBlog = async (blogId, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await dispatch(deleteBlog(blogId));
        navigate("/");
        dispatch(
          setNotification(`Blog "${name}" removed successfully`, "success"),
        );
      } catch (error) {
        dispatch(
          setNotification(`Error removing blog. ${error.message}`, "error"),
        );
      }
    }
  };

  const handleAddComment = async () => {
    try {
      await dispatch(addCommentToBlog(id, comment));
      setComment("");
      dispatch(setNotification("Comment added successfully", "success"));
    } catch (error) {
      dispatch(
        setNotification(`Error adding comment. ${error.message}`, "error"),
      );
    }
  };

  return (
    blog && (
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
              onClick={() => handleLike(blog)}
            >
              Like
            </button>
          </p>
          <div>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="type a comment..."
            ></input>
            <button onClick={handleAddComment}>add</button>
          </div>
          <strong>Comments: </strong>
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          {blog.user.some((user) => user.username === userInfo.username) && (
            <button onClick={() => removeBlog(blog.id, blog.title)}>
              Remove
            </button>
          )}
        </Togglable>
      </div>
    )
  );
};

export default Blog;
