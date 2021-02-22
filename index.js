const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config() // environmental variables
const Person = require('./models/person')

// json parser
app.use(express.json())

// cors middleware
const cors = require('cors')
app.use(cors())

// production build
app.use(express.static('build'))

// middleware
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// return in JSON format
let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// ------ info -----------

app.get('/info', (request, response) => {
  
  Person.countDocuments({}).then(count => {
    response.send(`<p>phonebook has info for <strong>${count} people</strong></p>
       <p>${new Date}</p>`)
  })

  // response.send(
  //   `<p>phonebook has info for ${persons.length}people</p>
  //   <p>${new Date}</p>`)
})

// --------- get single person ---------
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

// --------- delete person ---------
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(person => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

// ---------- add person --------
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * (1000-1) + 1),
  })
  person.save()
    .then(savedPerson => {
      response.json(person)
    })
    .catch(error => next(error))
})

// -------- change person --------------
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// ---------- middleware after routes ---------
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
// error handling middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)





const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)