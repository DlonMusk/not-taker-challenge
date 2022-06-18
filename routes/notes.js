// import helper functions and set notes as a router
const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile }  = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path')

// on get call read from file
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// on post call grab the data from the request body and append it to the JSON data
notes.post('/', (req, res) => {

    // Grab data out of req.body
    const { title, text } = req.body;

    // check if both title and text are set variables
    if(title && text){
        const newNote = {
            title,
            text,
            id: uuidv4()
        };
        
        // read data in from db.json and append new data
        readAndAppend(newNote, './db/db.json');
    
        // create success response
        const response = {
            status: 'success',
            body: newNote
        }
        
        // return a promise the response data as JSON else return error message
        res.json(response);
    }else res.json('Error in posting feedback')
});

// on delete call delete the note at selected id
notes.delete('/:id', (req, res) => {
    // read in data from database not asynchronously
    let databaseArray = fs.readFileSync(path.join(__dirname, '../db/db.json'));

    // parse JSON into data
    let data = JSON.parse(databaseArray);

    // keep track of index
    let index = 0;

    // find the index
    for (let i = 0; i < data.length; i++) {
        console.info(data[i].id);
        if (data[i].id === req.params.id) {
            console.info(i);
            index = i;
            break;
        }
    }

    // remove the data at selected index
    data.splice(index, 1);

    // rewrite over current data
    writeToFile(path.join(__dirname, '../db/db.json'), data);

    // send response
    res.json('note deleted')

})

module.exports = notes;