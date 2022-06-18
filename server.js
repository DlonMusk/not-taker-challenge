// import express, path modules and import index route
const express = require('express');
const path = require('path');
const api = require('./routes/index');

// set port for heroku and 3001 if on local machine
const PORT = process.env.PORT || 3001;

// create express application
const app = express();

// set middleware for reading json, urlencoded. set /api path and static path to public
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));



// /notes path directs to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// if path is not recognized send the user back to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// start listening for connections at specified port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));