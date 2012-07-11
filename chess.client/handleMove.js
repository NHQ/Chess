module.exports = move

function move (data){
	var a = document.getElementById(data.piece)	
	var b = document.getElementById(data.endPoint)	
		
	var piece = $(a)
		,	square = $(b)
	;
	
	console.log(data, piece, square)
	
	piece.attr('data-checker', square.attr('data-index'))
	if (square.children().length) square.children().appendTo($('.captured'));
	square.append(piece);	
}