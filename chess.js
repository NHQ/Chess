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
  app.use(express.favicon());
  app.use(express.logger('dev'));
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

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io.listen(server).sockets.on('connection', sockPuppet)

