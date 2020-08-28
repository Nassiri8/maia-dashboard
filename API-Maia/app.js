const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var cors = require('cors')
//const fetch = require('node-fetch');
'use strict';

const CONNECTION_URL = "mongodb+srv://nour:rkBIE2JqLGX97Gzg@cluster0.xofne.mongodb.net/Cluster0?retryWrites=true&w=majority";
const DATABASE_NAME = "Cluster0";
//cryptage pwd
const crypto = require('crypto');

// create express app
var app = express();

//enable cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("--allow-file-access-from-files");
    next();
  });
  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(CONNECTION_URL);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

//routes:
require('./src/routes/user.routes.js')(app);
require('./src/routes/produit.routes.js')(app);

app.get('/', function (req, res, test) {
    console.log(test)
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Maia API!'
    });
});

// listen for requests
app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        //collection = database.collection("people");
        console.log("Connected to `" + DATABASE_NAME + "`!");
        console.log("Server is listening on port 3000");
    });
});
