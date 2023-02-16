const mongo = require('mongoose')

const url = process.env.MONGODB_URL

mongo.set('strictQuery', false)
mongo.connect(url)

const schema = new mongo.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 1,
        required: true
    },
    date: {type: Date, default: Date.now}
})

schema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
    }
})

const Person = mongo.model('Person', schema)

module.exports = Person
