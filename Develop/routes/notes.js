// import helper functions and set notes as a router
const notes = require('express').Router();
const { readFromFile, readAndAppend }  = require('../helpers/fsUtils')

// on get call read from file
notes.get('/', (req, res) => {
    console.log("NOTES.GET");
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
            text
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

module.exports = notes;