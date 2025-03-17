import axios from 'axios'
import { Diary, DiaryNoId } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async () => {
  return await axios.get<Diary[]>(baseUrl).then(response => response.data)
}

const createNew = async (newDiary: DiaryNoId) => {
  return await axios.post<Diary>(baseUrl, newDiary).then(response => response.data)
}

export default { getAll, createNew }