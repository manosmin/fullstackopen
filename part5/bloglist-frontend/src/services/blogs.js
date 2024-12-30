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
  return axiosInstance.get()
    .then(response => response.data);
}

const create = (blog) => {
  return axiosInstance.post('', blog)
    .then(response => response.data);
}

export default { getAll, create, setAuthToken };
