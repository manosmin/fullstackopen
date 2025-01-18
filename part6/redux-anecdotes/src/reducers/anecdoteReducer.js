import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})


export const { createAnecdote, voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVoteToAnecdote = votedAnecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(votedAnecdote.id, votedAnecdote)
    dispatch(voteAnecdote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer