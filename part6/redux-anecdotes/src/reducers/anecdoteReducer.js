import { createSlice, current } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote (state, action) {
      const content = action.payload

      state.push(content)
    },
    voteAnecdote (state, action) {
      const id = action.payload

      const anecdotetoChange = state.find(a => a.id === id)
      
      const changedAnecdote = {
        ...anecdotetoChange,
        votes: anecdotetoChange.votes + 1
      }

      console.log(current(state))

      return state.map(note =>
        note.id !== id ? note : changedAnecdote 
      )  
    },
    setAnecdotes (state, action) {
      state.push(action.payload)
    }
  }
})


export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer