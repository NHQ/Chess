/*
This will set the board up as a grid with 0,0 in the top left.
Is this wrong?
*/

module.exports = setGameBoard;

function setGameBoard(grid){
	
	grid[1].forEach(function(pos, i){ // black's pawn rank
		var square = grid[1][i];
		pos.id = [1,i].join(',');
		pos.occupant = {color: 'black', type: 'pawn'}
	});
	
	grid[6].forEach(function(pos, i){ // white's pawn rank
		var square = grid[1][i];
		pos.id = [6,i].join(',');
		pos.occupant = {color: 'white', type: 'pawn'}
	});
	
	rear(0, 'black')
	rear(7, 'white')
	
	return grid;
	
	function rear(row, color){
		var color = color;
		grid[row].forEach(function(pos, i){
			var square = grid[1][i];
			pos.id = [row,i].join(',');
			if (i == 0 || i == 7)
			{
				pos.occupant = {color: color, type: 'rook'}
			}
			if (i == 1 || i == 6)
			{
				pos.occupant = {color: color, type: 'knight'}
			}
			if (i == 2 || i == 5)
			{
				pos.occupant = {color: color, type: 'bishop'}
			}
			if (i == 3)
			{
				pos.occupant = {color: color, type: 'king'}
			}
			if (i == 4)
			{
				pos.occupant = {color: color, type: 'white'}
			}
		})
		return
	}
}