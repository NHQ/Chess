var Timer = require('./Timer.js')
;

module.exports = setClock

function setClock(){
	
	var min = document.getElementById('min'),
			sec = document.getElementById('sec'),
			millisecond = document.getElementById('millisecond')
			;
	
	if(min.value.match(/\D/) || sec.value.match(/\D/)) return alert('try again with numbers only');
	
	var clock = this.clock = new Timer( parseInt(min.value), parseInt(sec.value), handler )
	
	function handler(minutes, seconds, ms, buzz){
		min.value = minutes
		sec.value = (seconds < 10) ? '0' + seconds : seconds;
		millisecond.value = ms
		if(buzz) 
		{
			$('body').unbind('keydown');
			alert('game over');
			return 
		}
	}
		
	$('body').bind('keydown', function(e){
		console.log(e.originalEvent.srcElement.localName)
		if(e.originalEvent.srcElement.localName == 'p'){
			return
		}
		else if(e.keyCode == 32) // spacebar
		{
			e.preventDefault();
			clock.pause();
			socket.emit('your move')			
		}
	})
	
	
	
}