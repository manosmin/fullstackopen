import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/blogs",
});

const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers["Authorization"];
  }
};

const getAll = () => {
  return axiosInstance.get().then((response) => response.data);
};

const create = (blog) => {
  return axiosInstance.post("", blog).then((response) => response.data);
};

const remove = (id) => {
  return axiosInstance.delete(`${id}`).then((response) => response.data);
};

const updateLikes = (id, likes) => {
  return axiosInstance.put(`${id}`, likes).then((response) => response.data);
};

const addComment = (id, comment) => {
  return axiosInstance
    .post(`${id}/comments`, comment)
    .then((response) => response.data);
};

export default {
  getAll,
  create,
  remove,
  updateLikes,
  setAuthToken,
  addComment,
};
