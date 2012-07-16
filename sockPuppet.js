var util = require('util')
	,	_ = require('underscore')
	,	Boards = {}, $b = 0
	,	Players = {}, $p = 0
	, Game = function(path, player){
			var game = {}
			game.id = path
			game.players = [];
			game.players.push(player.id);
			player._game = game
			return game
	}
	, Player = require('./game.server/Player.js')

module.exports = function(socket){
		
	var player = Players[socket.id] = socket;
	
	player.emit('connected')
		
	player.on('join', function(board){
						
		if(!Boards[board])
		{
			Boards[board] = new Game(board, player)
			player.emit('chat', {text: 'I am connected to game /' + Boards[board].id, from: 'self: '})
		}
		else
		{
			var game = Boards[board];
			switch (game.players.length)
			{
				case 0:
					game = new Game(board, player)
					player.emit('chat', {text: 'I am connected to game /' + game.id, from: 'self: '})
				break;
				case 1:
					if(game.players[0].id == player.id)
					{
						player.emit('chat', {text: 'I seem to be returning to game /' + game.id, from: 'self: '})
					}
					else
					{
						game.players.push(player)
						player.emit('chat', {text: 'I am connected to game /' + game.id + ' and I am player #' + game.players.length, from: 'self: '})
					}
				break;
				case 2:
					if(_.contains(game, player.id))
					{
						player.emit('chat', {text: 'I seem to be returning to board /' + game.id, from: 'self: '})
					}
					else
					{
						player.emit('chat', {text: 'There are already 2 players here. I will be disconnected' + game .id, from: 'self: '})
//						player.disconnect();	
					}
				break;
				default:
				break;
			}
		}
	})
	
	player.on('chat', function(data){
		player.broadcast.emit('chat', data)
	})
	
	player.on('reset', function(){
		player.broadcast.emit('reset')
	})
	
	player.on('move', function(data){
		player.broadcast.emit('move', data)
	})
	
}