// import express
const express = require('express');

// import notes router
const notesRouter = require('./notes');

// create express application
const app = express();

// set middleware
app.use('/notes', notesRouter);

module.exports = app;