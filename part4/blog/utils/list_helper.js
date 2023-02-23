const _ = require('lodash')

const dummy = () => 1

const totalLikes = (blogs) => _.reduce(blogs, (acc, b) => acc + b.likes, 0)

const favoriteBlog = (blogs) => (blogs.length === 0) ? {} : _.maxBy(blogs, 'likes')

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const groupByAuthor = _.groupBy(blogs, 'author')
    const authorToBlogCount = _.map(groupByAuthor, (blogs, author) =>
        ({ author: author, blogs: blogs.length }))
    return _.maxBy(authorToBlogCount, 'blogs')
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const groupByAuthor = _.groupBy(blogs, 'author')
    const authorToLikesCount = _.map(groupByAuthor, (blogs, author) =>
        ({ author: author, likes: _.sumBy(blogs, 'likes') }))
    return _.maxBy(authorToLikesCount, 'likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
