const express = require('express')
const app = express()
const morgan = require('morgan')

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
  response.json(persons)
})

// ------ info -----------

app.get('/info', (request, response) => {
  response.send(
    `<p>phonebook has info for ${persons.length}people</p>
    <p>${new Date}</p>`)
})

// --------- get single person ---------
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id) // need to typecast since it returns string
  const person = persons.find(person =>  person.id === id)

  if(person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// --------- delete person ---------
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

// ---------- add person --------
app.post('/api/persons', (request, response) => {
  const body = request.body
  // content property may not be empty.
  if (!body.name || !body.number) {
    return response.status(404).json({ 
      error: 'number or name is missing' 
    })
  } else if(persons.find(p => p.name === body.name)){
    return response.status(409).json({ 
      error: 'name must be unique' 
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * (1000-1) + 1),
  }
  persons = persons.concat(person)
  response.json(person)
})






const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)