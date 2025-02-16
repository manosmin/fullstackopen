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
    const blog = new Blog({ ...request.body, user: user._id, comments: [] })
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
    const { user } = request
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: `Blog with id ${request.params.id} not found` })
    }
    if (blog.user.toString() !== user.id.toString()) {
      return response.status(403).json({ error: 'You are unauthorized to delete this blog' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
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

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body

  if (!comment || typeof comment !== 'string') {
    return response.status(400).json({ error: 'Comment must be a non-empty string' })
  }

  try {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, id: 1 })
    if (!blog) {
      return response.status(404).json({ error: `Blog with id ${request.params.id} not found` })
    }

    blog.comments.push(comment)
    const updatedBlog = await blog.save()

    response.json(updatedBlog)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})


module.exports = blogsRouter
