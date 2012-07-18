var Timer = require('./Timer.js')
	,	
;

module.exports = setClock

function setClock(){
	
	var min = document.getElementById('#min'),
			sec = document.getElementById('#sec')
			;
	
	if(min.match(/\D/) || sec.match(/\D/)) return alert('try again with numbers only');
	
	var self = new Timer( parseInt(min.value), parseInt(sec.value), handler )
	
	function handler(minutes, seconds, ms, buzz){
		if(buzz) 
		{
			$(window).unbind('keydown');
			alert('game over');
			return 
		}
		min.value = minutes
		sec.value = (seconds < 10) ? '0' + seconds : seconds;
	}
	
	socket.emit('syncRSVP', {minutes: min.value, seconds: sec.value})
	
	
	
	$(window).bind('keydown', function(e){
		e.preventDefault();
		if(e.keyCode == 32)
		{
			
		}
	})
	
	
	
}