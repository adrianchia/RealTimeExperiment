var socket = io.connect('http://localhost:3000');
socket.on('news', function(data) {
	console.log(JSON.stringify(data));
	socket.emit('my other event', {my: 'data'});
});