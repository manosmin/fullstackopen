import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { createNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
      if (filter) {
        return anecdotes.filter(anecdote => 
          anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      }
      return anecdotes
    })
    
    const dispatch = useDispatch()
  
    const vote = (id) => {
      console.log('vote', id)
      dispatch(voteAnecdote(id))
      const votedAnecdote = anecdotes.find((a) => a.id === id).content
      dispatch(createNotification('you voted ' + votedAnecdote))
      setTimeout(() => { dispatch(removeNotification()) }, 5000)
    }

  return (
    <div>
        {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList