'use strict';
function SocketService() {
	var service = {};

	var pendingCallbacks = {};
	var currentMessageId = 0;

	var ws = new WebSocket("ws://" + window.location.hostname + (location.port ? ':' + location.port : ''));
	var preConnectionRequests = [];
	var connected = false;

	ws.onopen = function () {
		connected = true;
		if (preConnectionRequests.length === 0) return;

		console.log('Sending (%d) requests', preConnectionRequests.length);
		for (var i = 0, c = preConnectionRequests.length; i < c; i++) {
			ws.send(JSON.stringify(preConnectionRequests[i]));
		}
		preConnectionRequests = [];
	};

	ws.onmessage = function (message) {
		listener(JSON.parse(message.data));
	};

	function sendRequest(request, cb) {
		request.$id = generateMessageId();
		pendingCallbacks[request.$id] = cb;

		if (!connected) {
			console.log('Not connected yet, saving request', request);
			preConnectionRequests.push(request);
			return;
		}

		console.log('Sending request', request);
		ws.send(JSON.stringify(request));
	}

	function listener(message) {
		// If an object exists with id in our pendingCallbacks object, resolve it
		if (pendingCallbacks.hasOwnProperty(message.$id))
			pendingCallbacks[message.$id](message);
	}

	function requestComplete(id) {
		console.log("requestComplete:", id);
		delete pendingCallbacks[id];
	}

	function generateMessageId() {
		if (currentMessageId > 10000)
			currentMessageId = 0;

		return new Date().getTime().toString() + '~' + (++currentMessageId).toString();
	}

	service.sendRequest = sendRequest;
	service.requestComplete = requestComplete;
	return service;
}
