const mongo = require('mongoose')

const blogSchema = new mongo.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongo.model('Blog', blogSchema)

module.exports = Blog
