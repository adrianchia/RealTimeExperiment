var express = require('express');
var app = express();
var port = 8888;

app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/chat', function(req,res) {
    res.render('page', {username: req.query.username});
})

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function(socket) {
    socket.emit('message', {message: 'Welcome to chatroom'});
    socket.on('send', function(data) {
        io.sockets.emit('message', data);
    });
});
console.log("listening on port: " + port);
