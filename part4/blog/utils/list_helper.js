const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.length === 0 ? 0 : blogs.map(b => b.likes).reduce((s, l) => s + l)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    return blogs.reduce((fav, cur) => (cur.likes > fav.likes) ? cur : fav)
  }
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
