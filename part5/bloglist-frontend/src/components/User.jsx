import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/users";

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
    <div>
      <h2>{user.username} blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
