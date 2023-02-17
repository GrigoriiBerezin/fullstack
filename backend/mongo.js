const config = require('./utils/config')
const mongoose = require('mongoose')
const Note = require('./models/note')

mongoose.connect(config.MONGODB_URI)

const notes = [
  new Note({
    content: 'HTML is easy',
    important: true,
    date: Date.now()
  }),
  new Note({
    content: 'CSS is important',
    important: true,
    date: Date.now()
  })
]

notes.forEach(n => n.save().then(res => console.log(res)))
