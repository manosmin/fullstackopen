import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ setBlogs, setMessage, showFormRef }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
      likes,
    };
    blogService
      .create(newBlog)
      .then((response) => {
        setBlogs((prevBlogs) => [...prevBlogs, response]);
        showFormRef.current.toggleVisibility();
        setMessage({
          text: `Blog ${response.title} added successfully`,
          type: "success",
        });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        clearInput();
      })
      .catch((error) => {
        console.error("Error adding blog:", error.response.data.error);
        setMessage({
          text: error.response.data.error,
          type: "error",
        });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
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
