
var origin = process.env.NODE_ENV === 'production' ? '74.207.246.247' : '127.0.0.1'


exports.board = function(req, res){
  res.render('index', {origin: origin});
};
exports.index = function(req, res){
  var gameID = Math.ceil( Math.random() * Date.now() )
  res.redirect('/board/' + gameID);
}