var express = require('express')
  , routes = require('./routes')
  , http = require('http')
	,	app = express.createServer()
	, jade = require('jade')
	, io = require('socket.io')
	, sockPuppet = require('./sockPuppet.js')
	, browserify = require('browserify')
	, bundle = browserify(__dirname + '/chess.client/index.js')
;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3301);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser());
  app.use(express.session({secret: 'cocofarts'}));
  app.use(express.favicon(__dirname + '/public/favicon.png'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
	app.use(bundle);
  app.use(app.router);
  app.use(express.static(__dirname + '/public/images'), { maxAge: 86400000 });
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
app.get('/board/:gameID', routes.board);
app.get('/', routes.index);

var server = http.createServer(app).listen(app.get('port'), '127.0.0.1', function(){
  console.log("Express server listening on port " + app.get('port'));
});

var sockets = io.listen(server);
	sockets.configure('production', function(){
		sockets.enable('browser client minification');  // send minified client
		sockets.enable('browser client etag');          // apply etag caching logic based on version number
		sockets.enable('browser client gzip');          // gzip the file
		sockets.set('log level', 1);                    // reduce logging
		sockets.set('transports', [                     // enable all transports (optional if you want flashsocket)
		    'websocket'
		  , 'flashsocket'
		  , 'htmlfile'
		  , 'xhr-polling'
		  , 'jsonp-polling'
		]);
	});
	sockets.on('connection', sockPuppet)