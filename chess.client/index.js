window.Game = require('./Game.js');

var statsArray = require('stats-array')
	,	setClockControls = require('./controls/clock.controls.js')
	,	setChatControls = require('./controls/chat.controls.js')
	, setUIControls = require('./controls/UI.controls.js')
;

window.onload = function(){
	
	window.socket = io.connect('http://'+window.location.host + ':3333');
	
	socket.on('disconnect', function(){
		socket.disconnect();
	})

	socket.on('goToNew', function(){
		var redirect = window.location.origin || 'http://' + window.location.host
		window.location.href = redirect;
	})

	socket.on('connected', function(){
		
		var chat = setChatControls()
		
//		game.chat({text: '// connecting to game server... //', from: ''})
		
		socket.emit('join', {location: window.location.pathname.slice(1), ua: window.navigator.userAgent})

		socket.on('join', function(){
			
			new Game();
			game.chat = chat;
			gameInited()
			setClockControls()
			setUIControls()
		
		})

	})
		
	
	function gameInited (){
	
		socket.on('reset', window.game.reset)

		socket.on('setBoard', function(data){
			game.reset(data)
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
		
	}
	
	$(document).bind('touchmove', function(e){
		e.preventDefault();
	})
}