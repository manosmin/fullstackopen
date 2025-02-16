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
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    return <Container>You must be logged in to see blog data.</Container>;

  const handleLike = async (blog) => {
    try {
      await dispatch(addLikeToBlog(blog));
      dispatch(setNotification(`Blog "${blog.title}" liked`, "success"));
    } catch (error) {
      dispatch(
        setNotification(`Error liking blog. ${error.message}`, "danger"),
      );
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
          setNotification(`Error removing blog. ${error.message}`, "danger"),
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
        setNotification(`Error adding comment. ${error.message}`, "danger"),
      );
    }
  };

  return (
    blog && (
      <Container>
        <Row>
          <Card className="blog-item">
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>
              <strong>Author: </strong>
              {blog.author}
            </Card.Text>
            <Togglable buttonLabel="View blog" ref={viewBlogRef}>
              <Card.Text>
                <strong>URL: </strong>
                <a href={blog.url}>{blog.url}</a>
              </Card.Text>
              <Card.Text>
                <strong>Likes: </strong>
                {blog.likes}
                <Button
                  variant="success"
                  className="blog-like-button"
                  onClick={() => handleLike(blog)}
                >
                  Like
                </Button>
              </Card.Text>
              <Card.Text>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Type a comment..."
                    aria-label="comment"
                  />
                </InputGroup>
                <Button variant="primary" onClick={handleAddComment}>
                  Add
                </Button>
              </Card.Text>
              <Card.Text>
                <strong>Comments: </strong>
                <ListGroup>
                  {blog.comments.map((comment, index) => (
                    <ListGroup.Item key={index}>{comment}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Text>
              <Card.Text>
                {blog.user.some(
                  (user) => user.username === userInfo.username,
                ) && (
                  <Button
                    variant="danger"
                    onClick={() => removeBlog(blog.id, blog.title)}
                  >
                    Remove
                  </Button>
                )}
              </Card.Text>
            </Togglable>
          </Card>
        </Row>
      </Container>
    )
  );
};

export default Blog;
