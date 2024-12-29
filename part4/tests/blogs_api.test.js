const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

let authToken

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = {
    username: 'TestUser',
    password: 'TestPassword',
  }

  await api.post('/api/users/signup').send(user).expect(201)
  const loginResponse = await api
    .post('/api/users/login')
    .send(user)
    .expect(200)

  authToken = loginResponse.body.token

  const blogObjects = helper.initialBlogs.map((blog) => {
    return new Blog(blog)
  })
  await Promise.all(blogObjects.map(blog => blog.save()))
})

after(async () => {
  await mongoose.connection.close()
})

describe('fetched blogs', () => {
  test('without token returns 401', async () => {
    await api
      .get('/api/blogs')
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('equals the length of the blogs list', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${authToken}`)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('first blog title is React patterns', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${authToken}`)

    const contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('React patterns'), true)
  })

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${authToken}`)

    response.body.forEach(blog => {
      assert(blog.id !== undefined, 'Blog should have an id property')
      assert.strictEqual(blog._id, undefined, '_id should not be present')
    })
  })
})

describe('added blogs', () => {
  test('without title or url is not acceptable', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(helper.blogWithoutTitle)
      .expect(400)

    let blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(helper.blogWithoutUrl)
      .expect(400)

    blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('with valid properties is acceptable', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(helper.validBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    assert(titles.includes('First class tests'))
  })

  test('with missing likes property defaults to 0 likes', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(helper.blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)

    const blogsAtEnd = await helper.blogsInDb()
    const createdBlog = blogsAtEnd.find(blog => blog.title === helper.blogWithoutLikes.title)

    assert.strictEqual(createdBlog.likes, 0)
  })
})

describe('deleted blogs', () => {
  test('with existent id returns 204', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(helper.validBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const createdBlogId = response.body.id
    const blogsAtStart = await helper.blogsInDb()
    assert.strictEqual(
      blogsAtStart.length,
      helper.initialBlogs.length + 1
    )
    await api.delete(`/api/blogs/${createdBlogId}`).set('Authorization', `Bearer ${authToken}`).expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(
      blogsAtEnd.length,
      helper.initialBlogs.length
    )
    const blogExists = blogsAtEnd.find((blog) => blog.id === createdBlogId)
    assert.strictEqual(blogExists, undefined)
  })

  test('with non-existent blog id returns 404', async () => {
    const nonExistentId = await helper.nonExistingId()
    const blogsAtStart = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${nonExistentId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

describe('updated blogs', () => {
  test('with existent id and likes is acceptable', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(helper.validBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const createdBlogId = response.body.id
    const updatedLikes = { likes: 42 }

    const updateResponse = await api
      .put(`/api/blogs/${createdBlogId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(updateResponse.body.likes, 42)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find((blog) => blog.id === createdBlogId)
    assert.strictEqual(updatedBlog.likes, 42)
  })

  test('with non-existent id returns 404', async () => {
    const nonExistentId = await helper.nonExistingId()
    const updatedLikes = { likes: 15 }

    const blogsAtStart = await helper.blogsInDb()

    await api
      .put(`/api/blogs/${nonExistentId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedLikes)
      .expect(404)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })

  test('with non-existent likes returns 400', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${authToken}`)
      .send(helper.validBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const createdBlogId = response.body.id

    await api
      .put(`/api/blogs/${createdBlogId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send()
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    const blog = blogsAtEnd.find((blog) => blog.id === createdBlogId)

    assert.strictEqual(blog.likes, helper.validBlog.likes)
  })
})