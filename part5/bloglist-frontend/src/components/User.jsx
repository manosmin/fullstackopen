import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/users";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

export const User = () => {
  const id = useParams().id;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await userService.get();
      setUser(response.find((user) => user.id === id));
      setLoading(false);
    };
    fetchUserData();
  }, []);

  if (loading) {
    return;
  }

  return (
    <Container>
      <h2>
        <Badge bg="info"> {user.username} blogs </Badge>
      </h2>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default User;
