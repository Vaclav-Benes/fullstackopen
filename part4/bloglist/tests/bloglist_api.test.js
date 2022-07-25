const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let headers

beforeEach(async () => {

  await User.deleteMany({})
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  const newUser = {
    username: 'root',
    name:'root',
    password: 'password'
  }

  await api
    .post('/api/users')
    .send(newUser)

  const res = await api
    .post('/api/login')
    .send(newUser)

  headers = {
    'Authorization': `bearer ${res.body.token}`
  }

})

describe('Basic tests', () => {

  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .set(headers)
      .expect('Content-Type', /application\/json/)
  })

  test('The unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })
})

describe('Adding new blogs', () => {
  test('Blog can be added', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    const blogs = response.map(r => r.title)

    expect(response).toHaveLength(helper.initialBlogs.length +1)
    expect(blogs).toContain(
      'Type wars'
    )
  })

  test('Missing likes property defaults to 0', async () => {
    const newBlog = {
      title:'Missing properties are bad',
      author:'Yours truly',
      url:'http://example.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set(headers)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    const nBlog = response.find(blog => blog.title === 'Missing properties are bad')
    expect (nBlog.likes).toBe(0)
  })

  test('If title and url are missing, respond with 400', async () => {
    const nBlog = {
      author:'Bad coder',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .send(nBlog)
      .expect(400)

    const response = await helper.blogsInDb()

    expect(response).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Editing of blogs', () => {
  test('Blog update successful', async () => {
    const nBlog = {
      title:'Blog for updating',
      author:'Little tester',
      url:'http://example.org',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(nBlog)
      .set(headers)
      .expect(201)

    const allBlogs = await helper.blogsInDb()
    const tuBlog = allBlogs.find(blog => blog.title === nBlog.title)

    const uBlog = { ...tuBlog, likes: tuBlog.likes +1 }

    await api
      .put(`/api/blogs/${tuBlog.id}`)
      .send(uBlog)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const eBlogs = await helper.blogsInDb()
    expect(eBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const fBlog = eBlogs.find(blog => blog.likes === nBlog.likes + 1)
    expect(fBlog.likes).toBe(nBlog.likes + 1)

  })

  test('Delete blog, expect 204', async () => {
    const nBlog ={
      title:'Blog for deletion',
      author:'Lazy tester',
      url: 'http://example.org',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .send(nBlog)
      .expect(201)

    const aBlogs = await helper.blogsInDb()
    const tdBlog = aBlogs.find(blog => blog.title === nBlog.title)

    await api
      .delete(`/api/blogs/${tdBlog.id}`)
      .set(headers)
      .expect(204)

    const aeBlogs = await helper.blogsInDb()

    expect(aeBlogs).toHaveLength(helper.initialBlogs.length)

    const mBlogs = aeBlogs.map(r => r.title)

    expect(mBlogs).not.toContain(tdBlog.title)
  })
})
afterAll(() => {
  mongoose.connection.close()
})