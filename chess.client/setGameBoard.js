var createBoard = require('./createBoard.js')
	,	standardChess = require('./variations/standardChess.js')
;

/*
This will set the board up as a grid with 0,0 in the top left.
Is this wrong?
It is right from the layout PoV
*/

module.exports = setGameBoard;

function setGameBoard(opts){
	
	var x = opts.x || 8
		,	y = opts.y || 8
		,	variant = opts.variant || 'standard'
	;
	
	var board = createBoard(x,y)
	
	switch (variant)
	{
		case 'standard':
			var board = standardChess(board)
			break;
		case 'blank':
			break;
	}
	
	return board
	
}