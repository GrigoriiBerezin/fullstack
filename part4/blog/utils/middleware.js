const jwt = require('jsonwebtoken')
const logger = require('./logger')
const config = require('./config')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
    }

    next(error)
}

const userExtractor = async (request, response, next) => {
    const auth = request.get('authorization')
    if (auth && auth.startsWith('Bearer ')) {
        const token = auth.replace('Bearer ', '')
        const decodedToken = await jwt.verify(token, config.SECRET)
        if (decodedToken) {
            request.user = await User.findById(decodedToken.id)
        }
    }

    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    userExtractor
}
