var express = require('express');
var app = express();
var morgan = require('morgan');
require('dotenv').config();
var compression = require('compression');
var router = express.Router();
var rootRouter  = require('./src/routes/index.js')(router);
var cors = require('cors');


/**
 * Middlewares go here for the application.
 * if it gets to cumbersome then we can move to seperate file
 * if it gets to cumbersome then we can move to seperate file
 * 
 */



app.use(compression());
app.use(morgan('dev'));
app.use(express.static("public"));
app.use(express.json());//for parsing application/json
app.use(express.urlencoded({ extended: false})); //for parsing application/x-www-form-urlencoded
app.use(cors());
app.use('/api', rootRouter);


app.all('*', (req, res) => res.status(200).send({message : 'server is live'}));

module.exports = app;