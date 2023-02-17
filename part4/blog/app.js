const config = require('./utils/config')
const logger = require('./utils/logger')
require('express-async-errors')
const middleware = require('./utils/middleware')
const express = require('express')
const app = express()
const blogRouter = require('./controller/blogs')
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

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
