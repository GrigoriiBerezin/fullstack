const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 5
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    important: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.date
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
