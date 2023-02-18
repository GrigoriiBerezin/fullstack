const Note = require('../models/note')
const User = require('../models/user')

const initNotes = [
  {
    content: 'HTML is easy',
    important: false,
    date: Date.now()
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
    date: Date.now()
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initNotes, nonExistingId, notesInDb, usersInDb
}
