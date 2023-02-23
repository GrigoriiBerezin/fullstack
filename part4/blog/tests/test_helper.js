const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const initBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const theLastBlog = async () => {
    const blogs = await Blog.find()
        .sort({ _id: -1 })
        .limit(1)
    return blogs.map(b => b.toJSON())[0]
}

const initUser = {
    username: 'root',
    name: 'Superuser',
    passwordHash: '$2a$10$z5gpjNaRXze9Bs4YTkTB4OTFfOILtCu4qsRlvytYyEHyQ8cprVxPq'
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const nonExistedId = async () => {
    const user = new User({
        username: 'test',
        name: 'test_name',
        passwordHash: 'abcde'
    })
    await user.save()
    await user.delete()

    return user._id
}

const createTokenWithId = async (user) => {
    const newUser = await (new User(user)).save()
    const newToken = 'Bearer ' +
    await jwt.sign({ username: newUser.username, id: newUser._id }, config.SECRET)
    return { id: newUser._id, newToken }
}

module.exports = {
    initBlogs,
    initUser,
    blogsInDb,
    usersInDb,
    theLastBlog,
    nonExistedId,
    createTokenWithId
}
