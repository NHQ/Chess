module.exports = init;

function init (){
	
		var winX = $('body').width(), winY = window.innerHeight;

		var checker = Math.floor((Math.min(winX, winY) - 20) / 8)
			, style = document.createElement('style');
		
		style.textContent = 'tr {height:'+checker+'px;} td {height:'+checker+'px; width:'+checker+'px;}';
		
		var boardWidth = (checker * 8) + 30
			,	chatWidth = rightLeft = winX - boardWidth
			,	right = 0;
		
		style.textContent += 'table {width:'+boardWidth+'px;}'
		
		style.textContent += '.captured{left:'+boardWidth+'px;}'
		style.textContent += '.chatlog{height:'+checker*3+'px;}'
		if( rightLeft < 320)
		{
			chatWidth = 320;
			right = -340;
			style.textContent += '.chat{left:'+boardWidth+'px;top:'+(10+(checker*4))+'px;}'
		}

		style.textContent += '.chat {height:'+(checker * 4)+'px;width:'+chatWidth+'px;} .input {height:'+(checker - 5)+'px;}'

		document.body.appendChild(style)
		
		var chatlog = $('.chatlog')
			,	textBox = $('.input')
			
			function chatHTML (data, bool){
				var friend = document.createElement('h3')
					,	msg = document.createElement('p')
					, box = document.createElement('div')
				;
				friend.textContent = bool ? 'self: ' : 'friend: ';
				msg.textContent = data.text;
				box.appendChild(friend)
				box.appendChild(msg)		
				chatlog.append(box)
				chatlog[0].scrollTop = chatlog[0].scrollHeight;
			}
			

		textBox.bind('keyup', function(evt){
			if(evt.keyCode === 13){
				var el = $('.input').children()[0];
				var text = el.textContent;
				socket.emit('chat', {text: text});
				chatHTML({text: text}, true);
				el.textContent = '';
				$(el).focus();
			}
		})
		
		$('.captured').droppable({
			drop: function(evt, ui){
				var piece = ui.draggable;
				piece.css({
					top: 0,
					left: 0,
					position: 'relative'
				})
				$(this).append(piece)
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
					className = (j%2) ? 'white' : 'black'
				}
			
				else {
					className = (j%2) ? 'black' : 'white'
				}
			
				cell.setAttribute('tabindex', i * j);
				cell.setAttribute('cellspacing', '0px');
				cell.classList.add(className)
				cell.id = 'sq' + [j,i].join(',');
				cell.setAttribute('data-index', [j,i].join(','))
			
				$(cell).droppable({
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
							var data = {piece: piece[0].id, endPoint: $self[0].id};
							game.move(data);
							//piece.attr('data-checker', $self.attr('data-index'))
							//if ($self.children().length) $self.children().appendTo($('.captured'));
							//$self.focus().append(piece);
							socket.emit('move', {piece: piece.id, endPoint: $self.id})
						}
					} 
				})
			
				--j
			
			};
		
			j = 8;
		
		}
		return this.board
	}