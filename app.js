
/**
 * Module dependencies.
 */

var express = require('express'),
		app = express.createServer(),
		jade = require('jade'),
		io = require('socket.io').listen(app),
		sockPuppet = require('./sockPuppet.js'),
		browserify = require('browserify'),
		bundle = browserify(__dirname + '/chess.client/index.js')
;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
	app.use(bundle);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes	

app.get('/game/:id', function(req, res){
	res.render('index')
//	res.redirect('/chess.html')
})

app.listen(3001);
console.log("Express server listening on port %d", app.address().port);

io.sockets.on('connection', sockPuppet)

