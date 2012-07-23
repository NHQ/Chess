module.exports = setChatControls

function setChatControls(){
	
	var chatlog = $('.chatlog')
		,	textBox = $('.input')
	
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
	
	return chatHTML
	
}