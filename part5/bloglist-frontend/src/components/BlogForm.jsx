import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { addBlog } from "../reducers/blogReducer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

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
      dispatch(
        setNotification(`Error adding blog. ${error.message}`, "danger"),
      );
    }
  };

  return (
    <div>
      <h2>
        <Badge bg="info">Add a new blog</Badge>
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="blog-title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="blog-author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="blog-url">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="blog-likes">
          <Form.Label>Likes</Form.Label>
          <Form.Control
            type="number"
            placeholder="Likes"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
          />
        </Form.Group>
        <Button id="add-blog-button" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
