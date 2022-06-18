const notes = require('express').Router();
const readFromFile = require('../helpers/fsUtils')


notes.get('/', (req, res) => {
    console.log("NOTES.GET");
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    
});

module.exports = notes;