const config = require('./utils/config')
const logger = require('./utils/logger')
require('express-async-errors')
const middleware = require('./utils/middleware')
const express = require('express')
const app = express()
const blogRouter = require('./controller/blogs')
const userRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const cors = require('cors')
const mongo = require('mongoose')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongo.connect(config.MONGODB_URL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
