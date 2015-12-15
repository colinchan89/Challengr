//Packages
var express = require('express'),
		app	= express(),
		mongoose = require('mongoose'),
		logger = require('morgan'),
		bodyParser = require('body-parser')

//Connect to DB
mongoose.connect('mongodb://localhost/challengr', function(err){
	if(err) throw err
	console.log('Connected to MongoDB!')
});

//Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/', function(req, res){
	res.send('Welcome to Challengr')
});

app.listen(3000, function(){
	console.log('Server Running')
});
