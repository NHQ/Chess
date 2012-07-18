window.Game = require('./Game.js');
var statsArray = require('stats-array');

window.onload = function(){
		
	new Game();
	
	window.socket = io.connect('http://'+window.location.host);

	socket.on('reset', window.game.reset)

	socket.on('disconnect', function(){
		socket.disconnect();
		// game.kibitz()
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

	var chatlog = $('.chatlog')
		,	textBox = $('.input')
		
	var sync = document.getElementById('sixtysecond')
		, ms = document.getElementById('msbutton')
		, min = document.getElementById('min')
		,	sec = document.getElementById('sec')
	;

	$(sync, ms).click(function(e){
		var m = min.value
			,	s = sec.value
		window.game.setClock();
		socket.emit( 'syncRSVP', {minutes: m, seconds: s} )
	})
	
	socket.on('your move', function(){window.game.clock.start()})
	
	socket.on('syncRSVP', function(data){
		
		console.log(data)
		
		var m = data.minutes
			,	s = data.seconds
		;
		
		min.value = m;
		sec.value = s;
		window.game.setClock();
		socket.emit('your move')
	})
	
		
	function chatHTML (data, bool){
		var friend = document.createElement('h3')
			,	msg = document.createElement('p')
			, box = document.createElement('div')
		;
		friend.textContent = data.from;
		msg.textContent = data.text;
		box.appendChild(friend)
		box.appendChild(msg)		
		chatlog.append(box)
		chatlog[0].scrollTop = chatlog[0].scrollHeight;
	}
	
	socket.on('chat', function(data){
		chatHTML(data);
	})
		
	textBox.bind('keyup', function(evt){
		if(evt.keyCode === 13){
			var el = $('.input').children()[0];
			var text = el.textContent;
			socket.emit('chat', {text: text, from: 'opponent: '});
			chatHTML({text: text, from: 'me: '});
			el.textContent = '';
			$(el).focus();
		}
	})
	
	/*
	var last = Date.now();

	function record(el){
		var d = Date.now()
		console.log(d - last);
		last = d;
		requestAnimationFrame(loop)
	}
	*/
}