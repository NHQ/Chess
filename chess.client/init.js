module.exports = init;

function init (){
	
		$(document).bind('touchmove', function(e){
			e.preventDefault();
		})
	
		var winX = $('body').width(), winY = window.innerHeight;

		var checker = Math.floor((Math.min(winX, winY) - 20) / 8)
			, style = document.createElement('style');
		checker = Math.min(checker, 100);
		style.textContent = 'tr {height:'+checker+'px;} td {height:'+checker+'px; width:'+checker+'px;}';
		
		var boardWidth = (checker * 8) + 30
			,	chatWidth = 320
			,	right = 0;
		
		style.textContent += 'table {width:'+boardWidth+'px;}'
		style.textContent += '.sidebar{left:'+boardWidth+'px}'
		style.textContent += '.captured{left:'+boardWidth+'px;}'
//		style.textContent += '.chatlog{height:'+checker*3+'px;}'

	//	style.textContent += '.chat {height:'+(checker * 4)+'px;width:'+chatWidth+'px;} .input {height:'+(checker - 5)+'px;}'

		document.body.appendChild(style)
		
		$('.captured').droppable({
			drop: function(evt, ui){
				var $self = $(this);
				var piece = ui.draggable;
				piece.css({
					top: 0,
					left: 0,
					position: 'relative'
				});
				if ($self.attr('data-index') == piece.attr('data-checker')) 
				{
					return;
				}
				else
				{
					var data = {piece: piece[0].id, start: piece.attr('data-checker'), endPoint: $self[0].id};
					game.move(data);
					socket.emit('move', data)
				}
			}
		})

		this.board = document.getElementById('table');
		this.board.innerHTML = '';
		var tbody = document.createElement('tbody');
		this.board.appendChild(tbody);
	
		for (var i = 1, j = 8; i <= 8; ++i){
			var row = this.board.insertRow(0);

			row.id = i;

			while (j > 0){
			
				var className, cell = row.insertCell(0);
											
				if (i%2){
					className = (j%2) ? 'black' : 'white'
				}
			
				else {
					className = (j%2) ? 'white' : 'black'
				}
			
				cell.setAttribute('tabindex', i * j);
				cell.setAttribute('cellspacing', '0px');
				cell.classList.add(className)
				cell.id = 'sq' + [j,i].join(',');
				cell.setAttribute('data-index', [j,i].join(','))
			
				$(cell).droppable({
					tolerance: 'pointer',
					drop: function(evt, ui){
						var $self = $(this);
						var piece = ui.draggable;
						piece.css({
							top: 0,
							left: 0,
							position: 'relative'
						});
						if ($self.attr('data-index') == piece.attr('data-checker')) 
						{
							return;
						}
						else
						{
							var data = {piece: piece[0].id, start: piece.attr('data-checker'), endPoint: $self[0].id};
							game.move(data);
							socket.emit('move', data)
						}
					} 
				})
			
				--j
			
			};
		
			j = 8;
		
		}
		return this.board
	}