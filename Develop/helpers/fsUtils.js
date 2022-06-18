// import file system module and utility module
const fs = require('fs');
const util = require('util');

// cast fs.readFile as a promise
const readFromFile = util.promisify(fs.readFile);

// wrap fs.writeFile in a more readable function call with params set and stringify data into JSON
const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
        err ? console.error(err) : console.info(`\nData written to ${destination}`);
    });
}

// read the data in from the .json file, parse the data into a javascript object, push new content onto object, write new object to file
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
}

module.exports = { readFromFile, writeToFile, readAndAppend };

