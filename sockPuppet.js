var util = require('util')
	,	_ = require('underscore')
	,	Boards = {}, $b = 0
	,	Players = {}, $p = 0
	, Game = function(path, player){
			var game = {}
			game.id = path
			game.players = [];
			game.players.push(player);
			player._game = game;
			return game
	}
	, Player = require('./game.server/Player.js')
	, bot = 'chessbot: '

module.exports = function(socket){
		
	var player = Players[socket.id] = socket;
	
	player.opponent = function(){
		var self = this;
		var opponent = _.filter(this._game.players, function(e){
			return (e.id !== self.id)
		})[0];
		return opponent;
	}
	
	player.emit('connected')
	
	player.on('disconnect', function(){
		var	game = player._game;
		if(!game) return;
		game.players.forEach(function(e,i){
			if (e.id == player.id)
			{	
				game.players.splice(i,1);
				delete Players[player.id]
			}
			else
			{
				if(!game.players.length)
				{
					delete Boards[game.id]
				}
				else 
				{
					game.players[i].emit('chat', {text: 'Your opponent has disconnected.', from: bot})
				}
			}
			return
		})
	})
		
	player.on('join', function(board){
						
		if(!Boards[board])
		{
			Boards[board] = new Game(board, player)
			player.emit('chat', {text: 'You are connected to a new board. Send the link to your opponent.', from: bot})
		}
		else
		{
			var game = Boards[board];
			switch (game.players.length)
			{
				case 0:
					game = new Game(board, player)
					player.emit('chat', {text: 'You are connected to a new board. Send the link to your opponent.', from: bot})
				break;
				case 1:
					if(game.players[0].id == player.id)
					{
						player.emit('chat', {text: 'I seem to be returning to ' + game.id, from: bot})
					}
					else
					{
						game.players.push(player)
						player._game = game;
						player.emit('chat', {text: 'You are connected and so is your opponent.', from: bot})
						game.players[0].emit('chat', {text: 'Your opponent has connected.', from: bot})
						game.players[0].emit('initSync')
					}
				break;
				case 2:
						player.emit('goToNew');
						player.disconnect();	
				break;
				default:
				break;
			}
		}
	})
	
	player.on('syncGameBoard', function(data){
		var opponent = player.opponent();
		if (opponent) opponent.emit('syncGameBoard', data);
		return
	})

	player.on('your move', function(){
		var opponent = player.opponent();
		if (opponent) opponent.emit('your move');
		return
	})
	
	player.on('stopClock', function(data){
		var opponent = player.opponent();
		if (opponent) opponent.emit('stopClock', data);
		return
	})

	player.on('syncRSVP', function(data){
		var opponent = player.opponent();
		if (opponent) opponent.emit('syncRSVP', data);
		return
	})
	
	player.on('chat', function(data){
		var opponent = player.opponent();
		if (opponent) opponent.emit('chat', data);
		return
	})
	
	player.on('clearBoard', function(){
		var opponent = player.opponent();
		if (opponent) opponent.emit('clearBoard');
		return
	})
	
	player.on('reset', function(){
		var opponent = player.opponent();
		if (opponent) opponent.emit('reset');
		return
	})
	
	player.on('triggerUseGameClock', function(){
		var opponent = player.opponent();
		if (opponent) opponent.emit('triggerUseGameClock');
		return
	})
	
	player.on('move', function(data){
		var opponent = player.opponent();
		if (opponent) opponent.emit('move', data);
		return
	})
	
}