const express = require('express');
const app = express();
app.use(express.json());

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
];

const generateId = () => {
    return Math.floor(Math.random() * 15000) + 1;
};

app.get('/info', (request, response) => {
    const totalPersons = persons.length;
    const date = new Date();

    response.send(`<p>Phonebook has info for ${totalPersons} people</p><p>${date}</p>`);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((p) => p.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).send('person not found');
    }
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.name === '') {
        return response.status(400).json({
            error: 'name are required and cannot be empty',
        });
    }

    if (!body.number || !body.number === '') {
        return response.status(400).json({
            error: 'number are required and cannot be empty',
        });
    }

    if (persons.find((p) => p.name === body.name)) {
        return response.status(400).json({
            error: `${body.name} already exist on phonebook`,
        });
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number || '',
    };

    persons = persons.concat(person);

    console.log(person);
    response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((p) => p.id === id);

    if (person) {
        persons = persons.filter((p) => p.id !== id);
        response.status(204).end();
    } else {
        response.status(404).send('person not found');
    }
});

const PORT = 3001;
app.listen(PORT);
console.log(`server running on port ${PORT}`);
