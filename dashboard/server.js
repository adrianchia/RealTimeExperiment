'use strict';
var express = require('express');
var http = require('http');

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
	app.use(express.static(__dirname + '/public'));
	app.use(express.json());
	app.use(app.router);
});

app.get('/', function(req,res) {
	res.render('index');
});

app.get('/api/visitors', function(req,res) {
	res.jsonp([{name:"John"},{name:"Jack"}]);
});

app.post('/api/visitors', function(req,res) {
	io.sockets.emit('news', req.body)
	res.jsonp({message : "received!"});
});

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

io.sockets.on('connection',function(socket) {
	setInterval(function(){
		var data = [
		    {
		        value: getRandomInt(0,100),
		        color:"#637b85"
		    },
		    {
		        value : getRandomInt(0,100),
		        color : "#2c9c69"
		    },
		    {
		        value : getRandomInt(0,100),
		        color : "#dbba34"
		    },
		    {
		        value : getRandomInt(0,100),
		        color : "#c62f29"
		    }
		 
		];
		socket.emit('hours', data);
	}, 2000);
	
});