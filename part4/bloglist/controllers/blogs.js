const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name:1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  if (!body.likes) {
    body.likes =  0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const sBlog = await blog.save()
  user.blogs = user.blogs.concat(sBlog._id)
  await user.save()
  response.status(201).json(sBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const tdBlog = await Blog.findById(request.params.id)

  if( tdBlog.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if(!body.likes) {
    body.likes = 0
  }

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const tuBlog = await Blog.findById(request.params.id)

  if (tuBlog.user._id.toString() === user._id.toString()) {

    const nBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const uBlog = await Blog.findByIdAndUpdate(request.params.id, nBlog, { new:true })
    response.json(uBlog.toJSON())
  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }

})

module.exports = blogsRouter