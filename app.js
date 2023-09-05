const express = require('express')
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose')
const Fruit = require('./models/fruit')
const fs = require('fs');
const fruit = require('./models/fruit')
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    server: { sslCA: cert }
};
const connstring = 'mongodb+srv://jdcastlingbolt:JHiwDc31ZV2JHQoS@cluster0.aavwrft.mongodb.net/?retryWrites=true&w=majority'

const fruitRoutes = require("./routes/fruit");
const userRoutes = require('./routes/user')
mongoose.connect(connstring)
    .then(() => {
        console.log('Connected :-)')
    })
    .catch(() => {
        console.log('NOT Connected :-(')
    }, options);

app.use(express.json())
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization'); 
    res.setHeader('Access-Control-Allow-Methods', '*'); 
    next(); 
});
app.use(urlprefix + '/fruits', fruitRoutes)
app.use(urlprefix + '/users', userRoutes)
module.exports = app