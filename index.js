var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('chat message', function(name, msg){

		// check if we got command
		if( msg.startsWith("/") ){
			console.log("user entered command");
			socket.emit('change style', msg);
		}
		else{
			console.log('user sent message');
			socket.broadcast.emit('chat message',name, msg);
		}


	});
	socket.on('change style', function(style){
		var format = 'Style: ' + style;

		// print the message to log
		console.log(format);
	});
});

http.listen(port, function(){
	console.log('listening on *:' + port);
});