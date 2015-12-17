//Packages
var express = require('express'),
		app	= express(),
		mongoose = require('mongoose'),
		logger = require('morgan'),
		bodyParser = require('body-parser'),
		path = require('path'),
		config = require('./config'),
		Schema = mongoose.Schema,
		apiRoutes = express.Router()

//Connect to DB
mongoose.connect(config.database);

//create schemas
var gameSchema = new Schema({
	home: String,
	away: String,
	line: String,
	wager: Number
});
var userSchema = new Schema({
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false }
});

var Game = mongoose.model('Game', gameSchema);
var User = mongoose.model('User', userSchema);

//set up routes
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/allGames', express.static(path.join(__dirname, 'public/pages/games/all.html')));
app.use('/signup', express.static(path.join(__dirname, 'public/pages/signup.html')));

//Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(logger('dev'));

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization');
	next();
});

apiRoutes.route('/api/games')
	.get(function(req, res){
		Game.find({}, function(err, games){
			if (err) throw err
			res.json(games)
		})
	})
	.post(function(req, res){
		var game = new Game()
		game.home = req.body.home
		game.away = req.body.away
		game.line = req.body.line

		game.save(function(err){
			if(err) throw err
			Game.find({}, function(err, games){
				if (err) throw err
				res.json(games)
			})
		})
	});

apiRoutes.route('/api/users')
	.get(function(req, res){
		User.find({}, function(err, users){
			if (err) throw err
			res.json(users)
		})
	})
	.post(function(req, res){
		var user = new User()
		user.username = req.body.username
		user.password = req.body.password

		user.save(function(err){
			if(err) throw err
			User.find({}, function(err, users){
				if (err) throw err
				res.json(users)
			})
		})
	});

app.use('/', apiRoutes)

app.listen(config.port, function(){
	console.log('Server Running on ' + config.port)
});
