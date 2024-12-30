import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

export default { getAll }