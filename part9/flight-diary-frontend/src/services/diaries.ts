import axios from 'axios'
import { Diary } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async () => {
  return await axios.get<Diary[]>(baseUrl).then(response => response.data)
}

export default { getAll }