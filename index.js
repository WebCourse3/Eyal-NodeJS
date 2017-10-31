const express = require('express');
const app = express();

var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// set express to expose static files under public folder
app.use(express.static('public'));

// GET method route
app.get('/', function(req, res){
	// __dirname returns the directory that the currently executing script is in
	res.sendFile('public/index.html', {root: __dirname});
});

// POST method route
app.post('/', function (req, res) {
	res.send('POST request to the homepage')
})

io.on('connection', function(socket){
	console.log('a user connected');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});


