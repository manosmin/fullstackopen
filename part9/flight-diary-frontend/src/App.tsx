import Header from './components/Header'
import Entries from './components/Entries'
import Form from './components/Form'
import { useEffect, useState } from 'react'
import diariesService from './services/diaries'
import { Diary } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    diariesService.getAll().then(response => setDiaries(response))
  }, [])

  return (
    <div>
      <Header />
      <Form />
      <Entries diaries={diaries}/>
    </div>
  )
}

export default App