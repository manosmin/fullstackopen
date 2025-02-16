import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { addBlog } from "../reducers/blogReducer";

const BlogForm = ({ showFormRef }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const clearInput = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
    setLikes("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
      likes,
    };
    try {
      await dispatch(addBlog(newBlog));
      dispatch(
        setNotification(
          `Blog "${newBlog.title}" added successfully`,
          "success",
        ),
      );
      showFormRef.current.toggleVisibility();
      clearInput();
    } catch (error) {
      dispatch(setNotification(`Error adding blog. ${error.message}`, "error"));
    }
  };

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="blog-title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          id="blog-url"
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="number"
          placeholder="Likes"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
        />
        <button id="add-blog-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
