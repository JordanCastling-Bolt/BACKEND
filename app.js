const express = require('express')
const cors = require('cors');
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');

const options = {
    server: { sslCA: cert }
};

const connstring = 'mongodb+srv://jdcastlingbolt:JHiwDc31ZV2JHQoS@cluster0.aavwrft.mongodb.net/?retryWrites=true&w=majority'

const fruitRoutes = require("./routes/fruit");
const userRoutes = require('./routes/user');
const sanityRoutes = require("./routes/sanity");

mongoose.connect(connstring)
    .then(() => {
        console.log('Connected :-)')
    })
    .catch(() => {
        console.log('NOT Connected :-(')
    }, options);


app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization'); 
    res.setHeader('Access-Control-Allow-Methods', '*'); 
    next(); 
});

app.use(cors());
app.use(express.json());

app.use(urlprefix + '/fruits', fruitRoutes);
app.use(urlprefix + '/users', userRoutes);
app.use(urlprefix, sanityRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

module.exports = app