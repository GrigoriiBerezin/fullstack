const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
morgan.token('body', (req) => (JSON.stringify(req.body)))

const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => response.json(people))
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => response.json(person))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(() => response.status(204).end())
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({error: 'Content missing'})
    }

    Person.findByIdAndUpdate(request.params.id, {
        name: body.name,
        number: body.number,
        date: Date.now()
    }, {new: true}).then(updatedPerson => response.json(updatedPerson))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({error: 'Content missing'})
    }

    Person.findOne({name: body.name}).then(isExist => {
        if (isExist) {
            return response.status(409).json({error: `Name ${body.name} is already in list`})
        }

        const person = new Person({
            name: body.name,
            number: body.number
        })

        person.save().then(savedPerson => response.json(savedPerson))
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(people => {
        const header = `<p>Phonebook has info for ${people.length} people</p>`
        const date = `<p>${new Date}</p>`

        response.send(header + date)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
