/**
 * This is a basic starting point of the assignment
 * Modify the code according to your own needs and requirements
 */

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: './config.env'});
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(require('./routes/staff'));  //record

const dbo = require('./db/conn');

app.listen(port, () => {
    dbo.connectToServer(function (err)
    {if(err) console.error(err)});

    console.log(`Server is running on port: ${port}`);

});



//import express from 'express'; // <-- Module Style import
//import bodyParser from 'body-parser';

// Importing user route
//import router from './routes/users.js';
// const router = require('router')

// const bodyParser = require('body-parser')

//const app = express()
//const port = 3001
//const cors = require('cors');

//app.use(bodyParser.json())
// Adding a Router
//app.use('/users', router);

/*app.get('/', (req, res) => {
    res.send('Hello Universe!')
})

app.get('/todos', (req, res) => {
    res.send('A list of todo items will be returned')
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Posting a Request')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})*/
