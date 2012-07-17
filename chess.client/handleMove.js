module.exports = move

function move (data){
	var a = document.getElementById(data.piece)	
	var b = document.getElementById(data.endPoint)	
	console.log(data.piece)
	var piece = $(a)
		,	square = $(b)
	;
		
	piece.attr('data-checker', square.attr('data-index'))
	if (square.attr('data-index') !==  'x' && square.children().length) square.children().attr('data-checker', 'x').appendTo($('.captured'));
	square.append(piece);	
}