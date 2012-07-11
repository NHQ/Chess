window.Game = require('./Game.js')

window.onload = function(){
	
	new Game();
	
	window.socket = io.connect('http://localhost:3001');

	socket.on('reset', window.game.reset)

	socket.on('disconnect', function(){
		socket.disconnect();
		// game.kibitz()
	})

	socket.on('connected', function(){
		console.log('cnxd')
		socket.emit('join', window.location.pathname)
	})

	socket.on('move', function (data) {
		game.move(data)
	});


	var chatlog = $('.chatlog')
		,	textBox = $('.input')
		
	function chatHTML (data, bool){
		var friend = document.createElement('h3')
			,	msg = document.createElement('p')
			, box = document.createElement('div')
		;
		friend.textContent = bool ? 'self: ' : 'friend: ';
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
			socket.emit('chat', {text: text});
			chatHTML({text: text}, true);
			el.textContent = '';
			$(el).focus();
		}
	})
	var last = Date.now();

	function record(el){
		var d = Date.now()
		console.log(d - last);
		last = d;
		requestAnimationFrame(loop)
	}
	
}