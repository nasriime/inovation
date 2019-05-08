// server.js
'use strict'

const express = require('express');
const fs = require('fs');
const jsondata = require('./data');

const app = express()
app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});

app.post('/', (req, res) => {
    console.log('jsondata', jsondata);
    jsondata.users.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(jsondata), (err) => {
        if (err) throw err;
        res.send({res: 'File written to JSON.json'})
    })
});

app.get('/users', (req, res) => {
  res.send(jsondata);
})

app.listen(3000, ()=>{
  console.log('Listening on port 3000');
});