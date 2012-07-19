/*

	this is where the app should require the piece library

*/

module.exports = standardChessSetup

function standardChessSetup (grid){
	
	var grid = grid
	
	for(var x = 0; x < 8; ++x)
	{
		var square = grid[x][1];
		square.id = [x,1].join(',');
		square.occupant = {color: 'black', type: 'pawn'}
		
		var square = grid[x][6];
		square.id = [x,6].join(',');
		square.occupant = {color: 'white', type: 'pawn'}
	}
	
	rear(0, 'black')
	rear(7, 'white')
	
	return grid;
	
	function rear(col, color){
		var color = color;
		for(var x = 0; x < 8; ++x)
		{
			var pos = grid[x][col];
			pos.id = [x,col].join(',');
			if (x == 0 || x == 7)
			{
				pos.occupant = {color: color, type: 'rook'}
			}
			if (x == 1 || x == 6)
			{
				pos.occupant = {color: color, type: 'knight'}
			}
			if (x == 2 || x == 5)
			{
				pos.occupant = {color: color, type: 'bishop'}
			}
			if (x == 3)
			{
				pos.occupant = {color: color, type: 'king'}
			}
			if (x == 4)
			{
				pos.occupant = {color: color, type: 'queen'}
			}
		}
	}	

	return grid

}