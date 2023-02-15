const express = require('express')
const morgan = require('morgan')

const app = express()
morgan.token('body', (req) => (JSON.stringify(req.body)))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const generateId = (max) => {
    const ids = persons.map(p => p.id)
    let id = 1

    while (ids.includes(id)) {
        id = Math.floor(Math.random() * max)
    }

    return id
}

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({error: 'Content missing'})
    }

    if (persons.map(p => p.name).includes(body.name)) {
        return response.status(409).json({error: `Name ${body.name} is already in list`})
    }

    const person = {
        id: generateId(500),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    return response.json(person)
})

app.get('/info', (request, response) => {
    const header = `<p>Phonebook has info for ${persons.length} people</p>`
    const date = `<p>${new Date}</p>`

    response.send(header + date)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
