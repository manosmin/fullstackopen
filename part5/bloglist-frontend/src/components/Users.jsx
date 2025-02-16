import React, { useEffect, useState } from "react";
import userService from "../services/users";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await userService.get();
      setUsers(response);
    };
    fetchUserData();
  }, []);

  return (
    <Container>
      <h1>Users</h1>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>
              <h3>blogs created</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
