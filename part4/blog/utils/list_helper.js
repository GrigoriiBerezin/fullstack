const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => _.reduce(blogs, (acc, b) => acc + b.likes, 0)

const favoriteBlog = (blogs) => {
  const result = _.maxBy(blogs, 'likes')
  return result ? result : {}
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const groupByAuthor = _.groupBy(blogs, 'author')
  const authorToBlogCount = _.map(groupByAuthor, (blogs, author) => {
    return {author: author, blogs: blogs.length}
  })
  return _.maxBy(authorToBlogCount, 'blogs')
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs}
