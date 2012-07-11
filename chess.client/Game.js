var	setPieces = require('./setPieces.js')
	,	initBoard = require('./init.js')
	,	move = require('./handleMove.js')
;

function Game (moves){
	var self = this;
	window.game = this;
	this.moves = moves ? moves : [];
	this.init();
	this.setPieces();
	window.chessGame = this;
	return self
}

module.exports = Game;

Game.prototype.rotate = function(){
	if(_.contains(this.board.classList, 'rotate'))
	{
		this.board.classList.remove('rotate')
	}
	else
	{
		this.board.classList.add('rotate')
	}
};

Game.prototype.setPieces = setPieces;

Game.prototype.init = initBoard;

Game.prototype.move = move;

Game.prototype.reset = function(){
	$('*').unbind()
	new Game();
}

Game.prototype._reset = function(){
	var x = confirm('Reset pieces? This will effect your oppnents board.');
	if(x) 
	{
		window.socket.emit('reset')
		this.reset();
	}
}