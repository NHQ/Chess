var	setPieces = require('./setPieces.js')
	,	init = require('./init.js')
	,	move = require('./handleMove.js')
	,	initBoard = require('./initGameLogic.js')
        ,       setGameBoard = require('./setGameBoard.js')
            , initGameLogic = require('./initGameLogic')
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

Game.prototype.initGameLogic = initGameLogic;

Game.prototype.initBoard = initBoard;

Game.prototype.setPieces = setPieces;

Game.prototype.init = init;

Game.prototype.move = move ;

Game.prototype.reset = function(){
	$('table').children().unbind()
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