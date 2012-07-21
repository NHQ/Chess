var	init = require('./init.js')
	,	move = require('./handleMove.js')
  , setGameBoard = require('./setGameBoard.js')
	,	setClock = require('./clock.js')
;

function Game (moves){
	var self = this;
	window.game = this;
	this.moves = moves ? moves : [];
	this.init();
	window.chessGame = this;
	return self
}

module.exports = Game;

Game.prototype.setClock = setClock;

Game.prototype.rotate = function(){
	if(_.contains(this.table.classList, 'rotate'))
	{
		this.table.classList.remove('rotate')
	}
	else
	{
		this.table.classList.add('rotate')
	}
};

Game.prototype.betaBoard = setGameBoard

Game.prototype.init = init;

Game.prototype.move = move ;

Game.prototype.reset = function(){
	$('#table div img').children().unbind();
	$('#table').empty();
	$('#captured').empty();
	if(game.clock) game.clock.reset();
	game.init();
}

Game.prototype.clearBoard = function(){
	var self = this;
	$('#table div > img').each(function(e,i){
		self.move({piece: i.id, endPoint: 'captured'})
	})
}

Game.prototype._clearBoard = function(){
	window.socket.emit('clearBoard')
	this.clearBoard();
}


Game.prototype._reset = function(){
		// removed window.confirm
		window.socket.emit('reset')
		this.reset();
}