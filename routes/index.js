
var origin = process.argv[2] || "0.0.0.0"
var port = Number(process.argv[3]) || 3301


exports.board = function(req, res){
  res.render('index', {origin: origin, port: port});
};
exports.index = function(req, res){
  var gameID = Math.ceil( Math.random() * Date.now() )
  res.redirect('/board/' + gameID);
}
