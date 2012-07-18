var	setPieces = require('./setPieces.js')
	,	init = require('./init.js')
	,	move = require('./handleMove.js')
	,	initBoard = require('./initGameLogic.js')
  , setGameBoard = require('./setGameBoard.js')
  , initGameLogic = require('./initGameLogic')
	,	clock = require('./setClock.js')
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

Game.prototype.setClock = setClock;

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
	$('table').children().unbind();
	$('#captured').empty()
	new Game();
}

Game.prototype.clearBoard = function(){
	var self = this;
	$('td > img').each(function(e,i){
		self.move({piece: i.id, endPoint: 'captured'})
	})
}

Game.prototype._reset = function(){
		// removed window.confirm
	
		this.reset();
}