const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  } else {
    req.token = null
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const { token } = req
  if (!token) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return res.status(401).json({ error: 'user not found' })
    }
    req.user = user
    next()
  } catch {
    return res.status(401).json({ error: 'token invalid' })
  }
}

module.exports = {
  tokenExtractor,
  userExtractor
}
