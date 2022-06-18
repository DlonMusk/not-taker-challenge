const express = require('express');
const path = require('path');
const api = require('./routes/index');

const PORT = process.env.port || 3001;

const app = express();
console.log(__dirname)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));



app.get('/', (req, res) => {
    console.log('/');
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/notes', (req, res) => {
    console.log('/notes');
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    console.log('*')
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));