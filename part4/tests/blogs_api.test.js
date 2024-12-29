const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  await Promise.all(blogObjects.map(blog => blog.save()))
})

after(async () => {
  await mongoose.connection.close()
})

describe('fetched blogs', () => {
  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('equals the length of the blogs list', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('first blog title is React patterns', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('React patterns'), true)
  })

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')

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
      .send(helper.blogWithoutTitle)
      .expect(400)

    let blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    await api
      .post('/api/blogs')
      .send(helper.blogWithoutUrl)
      .expect(400)

    blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('with valid properties is acceptable', async () => {
    await api
      .post('/api/blogs')
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
      .send(helper.blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)

    const blogsAtEnd = await helper.blogsInDb()
    const createdBlog = blogsAtEnd.find(blog => blog.title === helper.blogWithoutLikes.title)

    assert.strictEqual(createdBlog.likes, 0)
  })
})