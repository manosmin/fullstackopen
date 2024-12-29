const express = require('express')
const Blog = require('../models/blog')
const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    const user = request.user
    const blog = new Blog({ ...request.body, user: user._id })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const populatedBlog = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1, id: 1 })
    response.status(201).json(populatedBlog)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    if (!deletedBlog) {
      return response.status(404).json({ error: `Blog with id ${request.params.id} not found` })
    }
    response.status(204).end()
  } catch(error) {
    response.status(400).json({ error: error.message })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  if (!likes) {
    return response.status(400).json({ error: 'Likes cannot be null' })
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true, runValidators: true }
    ).populate('user', { username: 1, name: 1, id: 1 })
    if (!updatedBlog) {
      return response.status(404).json({ error: `Blog with id ${request.params.id} not found` })
    }
    response.json(updatedBlog)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})


module.exports = blogsRouter
