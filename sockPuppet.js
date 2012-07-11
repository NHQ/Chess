var boards = {};

module.exports = function(socket){
	
//	console.log(socket)
	
	socket.on('join', function(data){
		console.log(data)
	})
	
	socket.on('chat', function(data){
		socket.broadcast.emit('chat', data)
	})
	
	socket.on('reset', function(){
		socket.broadcast.emit('reset')
	})
	
	socket.on('move', function(data){
		socket.broadcast.emit('move', data)
	})
	
}