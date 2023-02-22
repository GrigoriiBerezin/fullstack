const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'user doesn\'t exist' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  })

  let savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  savedBlog = await savedBlog.populate('user', { username: 1, name: 1 })

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'user doesn\'t exist' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user && blog.user.toString() === user.id) {
    await blog.remove()
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'cannot delete not your own blog' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter
