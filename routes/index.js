var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/home', function(req, res, next) {
  res.render('index');
});

router.get('/pages/:name', function(req, res) {
  var name = req.params.name;
  res.render('pages/' + name);
});

router.get('/pages/:subFolder/:name', function(req, res) {
  var subFolder = req.params.subFolder;
  var name = req.params.name;
  res.render('pages/' + subFolder + '/' + name);
});

module.exports = router;
