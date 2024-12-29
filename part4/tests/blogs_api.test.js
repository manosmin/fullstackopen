const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('the first blog title is React patterns', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('React patterns'), true)
})

test('blog without title or url is not added', async () => {
  
    await api
      .post('/api/blogs')
      .send(helper.blogWithoutTitle)
      .expect(400);
  
    let blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  
    await api
      .post('/api/blogs')
      .send(helper.blogWithoutUrl)
      .expect(400);
  
    blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

test('a valid blog can be added ', async () => {

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

test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs');
  
    response.body.forEach((blog) => {
      assert(blog.id !== undefined, 'Blog should have an id property');
      assert.strictEqual(blog._id, undefined, '_id should not be present');
    });
  });

test('if the likes property is missing from the request defaults to 0', async () => {

    const response = await api
        .post('/api/blogs')
        .send(helper.blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.likes, 0);

    const blogsAtEnd = await helper.blogsInDb();
    const createdBlog = blogsAtEnd.find((blog) => blog.title === helper.blogWithoutLikes.title);

    assert.strictEqual(createdBlog.likes, 0);
});

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
})

after(async () => {
  await mongoose.connection.close()
})