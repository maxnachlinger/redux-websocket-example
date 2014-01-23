"use strict";
var _ = require('lodash');
var util = require('util');
var through = require('through');
var stream = require('stream');

module.exports = function (socket, request) {
	var messageId = request.$id;
	console.log("request", request);

	getCommentsStream(function(err, ars) {
		if(err) return handleError(err);

		ars.on('error', handleError);
		ars.pipe(through(
			function write(comment) {
				socket.send(JSON.stringify({$type: 'dataReceived', $id: messageId, data: comment}), function (err) {
					if (!err || socket.readyState == 3)
						return; // NOP, disconnected

					console.error(err);
				});
			},
			function end() {
				socket.send(JSON.stringify({$type: 'dataCompleted', $id: messageId}), function (err) {
					if (!err || socket.readyState == 3)
						return; // NOP, disconnected

					console.error(err);
				});
			}
		));
	});

	function handleError(err) {
		console.error(err);
		socket.send(JSON.stringify({$type: 'error', $id: messageId, data: err}));
	}

	function getCommentsStream(cb) {
		// make lots of comments
		var input = _.map(_.range(1000), function (i) {
			i = Math.random()*101|0;
			return {
				author: "Test Author " + i,
				text: "This is a test comment " + i
			}
		});

		// simple readble-array-stream thing
		function ArrayReadableStream(data) {
			var self = this;
			stream.Readable.call(self, { objectMode: true });

			self._read = function () {
				data.forEach(function (element) {
					self.push(element);
				});
				self.push(null);
			};
		}
		util.inherits(ArrayReadableStream, stream.Readable);

		cb(null, new ArrayReadableStream(input));
	}
};
