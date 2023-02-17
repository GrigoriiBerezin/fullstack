const mongo = require('mongoose')

const blogSchema = new mongo.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

const Blog = mongo.model('Blog', blogSchema)

module.exports = Blog
