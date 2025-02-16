import axios from "axios";
const baseUrl = "/api/users";

const login = (creds) => {
  const request = axios.post(`${baseUrl}/login`, creds);
  return request.then((response) => response.data);
};

const get = (creds) => {
  const request = axios.get(`${baseUrl}`);
  return request.then((response) => response.data);
};

export default { login, get };
