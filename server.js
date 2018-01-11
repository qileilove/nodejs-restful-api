// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var expressValidator	 = require('express-validator');
var routes = require('./app/routers/router');
var mongoose   = require('mongoose');
var port     = process.env.PORT || 8080; // set our port

// configure app
app.use(expressValidator());
  
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// DATABASE SETUP

mongoose.connect('mongodb://localhost/express_demo'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Bear models lives here
var Bear     = require('./app/models/bear');

// ROUTES FOR OUR API
// =============================================================================

// create our router
routes(app);

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
  });
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
module.exports = app;
