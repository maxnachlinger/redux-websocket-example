'use strict';
function SocketService() {
	var service = {};
	var pendingCallbacks = {};
	var currentMessageId = 0;
	var ws;
	var preConnectionRequests = [];
	var connected = false;

	function init() {
		service = {};
		pendingCallbacks = {};
		currentMessageId = 0;
		preConnectionRequests = [];
		connected = false;
		
		ws = new WebSocket("ws://" + window.location.hostname + (location.port ? ':' + location.port : ''));

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
	}

	init();

	function sendRequest(request, cb) {
		// websocket closing / closed, reconnect
		if(ws && ~[2,3].indexOf(ws.readyState)) {
			connected = false;
			init();
		}

		request.$id = generateMessageId();
		pendingCallbacks[request.$id] = cb;

		if (!connected) {
			console.log('Not connected yet, saving request', request);
			preConnectionRequests.push(request);
		} else {
			console.log('Sending request', request);
			ws.send(JSON.stringify(request));
		}
		return request.$id;
	}

	function listener(message) {
		console.log('listener, id:', message.$id, 'ws.readyState', ws.readyState);
		// If an object exists with id in our pendingCallbacks object, resolve it
		if (pendingCallbacks.hasOwnProperty(message.$id))
			pendingCallbacks[message.$id](message);
	}

	function requestComplete(id) {
		console.log("requestComplete:", id, 'ws.readyState', ws.readyState);
		delete pendingCallbacks[id];
	}

	function reconnect() {
		console.log('reconnecting');
		ws.close();
		init();
	}

	function generateMessageId() {
		if (currentMessageId > 10000)
			currentMessageId = 0;

		return new Date().getTime().toString() + '~' + (++currentMessageId).toString();
	}

	service.sendRequest = sendRequest;
	service.requestComplete = requestComplete;
	service.reconnect = reconnect;
	return service;
}
