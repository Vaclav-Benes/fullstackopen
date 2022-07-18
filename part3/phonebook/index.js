const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

let personList = [
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

//GET http://localhost:3001/api/persons
app.get("/api/persons", (request, response) => {
    response.json(personList)
})

//GET http://localhost:3001/info
app.get("/info", (request, response) => {

    const nDate = new Date()
    const numPpl = personList.length

    const msg = `<p>Phonebook has info for ${numPpl} people</p> <p>${nDate}</p>`
    response.send(msg)
})

//GET http://localhost:3001/api/persons/:id
app.get("/api/persons/:id", (request, response) => {
    const rId = Number(request.params.id)

    const person = personList.find(person => person.id === rId)

    if (person) {
        response.json(person)
    } else {
        response.status(404)
        response.send("Person does not exist.")
    }

})

//DELETE http://localhost:3001/api/persons/:id
app.delete("/api/persons/:id", (request, response) => {
    const rId = Number(request.params.id)

    personList = personList.filter(person => person.id !== rId)

    response.status(204).end()
})

//POST  http://localhost:3001/api/persons
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const fPerson = personList.filter((person) => person.name === body.name)

    if (fPerson.length !== 0) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const nId = Math.floor(Math.random() * 1000000)

    const nPerson = {
        "id": nId,
        "name": body.name,
        "number": body.number
    }

    personList = personList.concat(nPerson)

    response.json(nPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})