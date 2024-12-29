const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers.map(user => new User(user))
  await Promise.all(userObjects.map(user => user.save()))
})

after(async () => {
  await mongoose.connection.close()
})

describe('added users', () => {
  test('passes if data is valid', async () => {
    await api
      .post('/api/users/signup')
      .send(helper.validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(helper.validUser.username))
  })

  test('fails if username is taken', async () => {
    await api
      .post('/api/users/signup')
      .send(helper.takenUser)
      .expect(400)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })

  test('fails if password is short', async () => {
    await api
      .post('/api/users/signup')
      .send(helper.invalidUser)
      .expect(400)
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })
})