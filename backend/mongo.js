const mongo = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as an argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://grishaberezin1998:${password}@cluster0.niljo3f.mongodb.net/noteApp?retryWrites=true&w=majority`

mongo.set('strictQuery', false)
mongo.connect(url)

const noteSchema = new mongo.Schema({
    content: String,
    important: Boolean
})

const Note = mongo.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is easy',
    important: true
})

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongo.connection.close()
})
