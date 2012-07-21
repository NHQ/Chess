window.Game = require('./Game.js');

var statsArray = require('stats-array')
	,	setClockControls = require('./controls/clock.controls.js')
	,	setChatControls = require('./controls/chat.controls.js')
;

window.onload = function(){
		
	new Game();
	
	window.socket = io.connect('http://'+window.location.host);

	setClockControls()
	setChatControls()

	socket.on('reset', window.game.reset)

	socket.on('disconnect', function(){
		socket.disconnect();
	})

	socket.on('goToNew', function(){
		var redirect = window.location.origin || 'http://' + window.location.host
		window.location.href = redirect;
	})

	socket.on('connected', function(){
		socket.emit('join', window.location.pathname.slice(1))
	})

	socket.on('move', function (data) {
		game.move(data)
	});
	
	socket.on('your move', function(){window.game.clock.start()})
	
	socket.on('clearBoard', function(){
		game.clearBoard.call(game);
	})
	
	socket.on('syncGameBoard', function(data){
//		console.log(data);
	})
	
	socket.on('initSync', function(){
		socket.emit('syncGameBoard', JSON.stringify(game.board))
		if(game.clock)
		{
			var data = Object.create(null)
			data.seconds = game.clock.config.seconds
			data.minutes = game.clock.config.minutes
			socket.emit('syncGameClock', data)			
		}
	})	
		
	
	$(document).bind('touchmove', function(e){
		e.preventDefault();
	})
}