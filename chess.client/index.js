window.Game = require('./Game.js')

window.onload = function(){
	
	new Game();
	
	window.socket = io.connect('http://localhost:3001');

	socket.on('reset', window.game.reset)

	socket.on('disconnect', function(){
		socket.disconnect();
		// game.kibitz()
	})

	socket.on('chat', function(data){
		chatHTML(data);
	})

	socket.on('connected', function(){
		console.log('cnxd')
		socket.emit('join', window.location.pathname)
	})

	socket.on('move', function (data) {
		game.handleMove(data)
	});

	var last = Date.now();

	function record(el){
		var d = Date.now()
		console.log(d - last);
		last = d;
		requestAnimationFrame(loop)
	}
	
}