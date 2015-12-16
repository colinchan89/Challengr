//Packages
var express = require('express'),
		app	= express(),
		mongoose = require('mongoose'),
		logger = require('morgan'),
		bodyParser = require('body-parser'),
    ejs = require('ejs'),
    ejsLayouts = require('express-ejs-layouts')

//Connect to DB
mongoose.connect('mongodb://localhost/challengr', function(err){
	if(err) throw err
	console.log('Connected to MongoDB!')
});

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization');
	next();
});

app.get('/', function(req, res){
	res.render('index')
});

app.listen(3000, function(){
	console.log('Server Running')
});
