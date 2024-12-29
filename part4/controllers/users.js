const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const usersRouter = express.Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/signup', async (request, response) => {
  try {
    const { username, name, password } = request.body
    await User.findOne({ username })
    if (!password || password.length < 3) {
      return response.status(400).json({
        error: 'password must be at least 3 characters long'
      })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

usersRouter.post('/login', async (request, response) => {
  try {
    const { username, password } = request.body
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.JWT_SECRET)
    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

module.exports = usersRouter