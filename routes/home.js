var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var UserName = "Guest User";
  if(req.session.userName)
    UserName = req.session.userName.username;
  res.render('home', { 'uname': UserName });
});

module.exports = router;
