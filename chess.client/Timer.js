module.exports = Timer

function Timer (minutes, seconds, callback){
	
	var minutes = minutes || 0, 
			seconds = seconds || 0
			callback = callback || function(){};
	
	var time = Object.create(null);
	
	time.init = function(){
		
		this.emit = callback;
					
		this.clock = (seconds * 100) + (minutes * 6000) // total time in 1/100th seconds 
		
		this.progress = false;
		
		this._min = minutes
		
		this._sec = seconds
		
	}
			
	time.tick = function(self){
		
		if ( ! (--self.clock >= 0) ) {
			self.pause()
			self.end()
			return
		}
		
		var min = Math.floor(self.clock / 6000),
				sec = Math.floor((self.clock % 6000) / 100)
				;
		
		self.emit(min, sec, self.clock / 100, false)
								
	}
	
	time.start = function(){
		
		this.progress = true
		
		this.timer = setInterval(this.tick, 10, this)

	}
	
	time.pause = function(){
		
		window.clearInterval(this.timer)
		
		this.progress = false
	
	}
	
	time.end = function(){
		
		self.emit(0, 0, 0, true)
	
	}
	
	time.init();
	
	return time;
	
}