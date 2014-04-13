"use strict";

// prebuild comments
var comments = new Array(1001).join(',').split(',').map(function (v, i) {
	i = Math.random() * 101 | 0;
	return {
		author: "Test Author " + i,
		text: "This is a test comment " + i
	};
});

module.exports = function (socket, request) {
	var messageId = request.$id;

	comments.forEach(function(c) {
		send({$type: 'dataReceived', $id: messageId, data: c});
	});
	send({$type: 'dataCompleted', $id: messageId});

	function handleError(err) {
		send({$type: 'error', $id: messageId, data: err});
	}

	function send(msg, cb) {
		cb = cb || function () {};

		socket.send(JSON.stringify(msg), function (err) {
			if (socket.readyState == 3)
				return cb(); // NOP, disconnected
			cb(err);
		});
	}
};
