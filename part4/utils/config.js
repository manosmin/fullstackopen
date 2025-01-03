const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = { PORT, MONGODB_URI, NODE_ENV }
