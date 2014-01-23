"use strict";
var http = require('http');
var filed = require('filed');
var oppressor = require('oppressor');
var ws = require('ws').Server;

var port = process.env.PORT || 3000;
var staticDir = __dirname + '/client';

var server = http.createServer(function (req, res) {
	filed(staticDir + req.url)
		.pipe(oppressor(req))
		.pipe(res);
}).listen(port, console.log.bind(console, 'listening on port: %d', port));

var wss = new ws({server: server});
var handlers = {
	commentsRequested: require('./handlers/commentsRequested')
	// additional handlers could go here
};

wss.on('connection', function (socket) {
	console.log("connection");
	socket.on('message', function (message) {
		message = JSON.parse(message);
		message.type = message.type || 'commentsRequested';
		console.log('%s received', message.type);
		handlers[message.type](socket, message);
	});
});
