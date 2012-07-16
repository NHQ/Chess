
/*
 * GET home page.
 */


exports.board = function(req, res){
  res.render('index');
};
exports.index = function(req, res){
  var gameID = Math.ceil( Math.random() * Date.now() )
  res.redirect('/board/' + gameID);
  //  if(you.must) laugh
}