const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/home', (req, res, next) => {
  res.render('index');
});

router.get('/pages/:name', (req, res) => {
  const name = req.params.name;
  res.render('pages/' + name);
});

router.get('/pages/:subFolder/:name', (req, res) => {
  const subFolder = req.params.subFolder;
  const name = req.params.name;
  res.render('pages/' + subFolder + '/' + name);
});

module.exports = router;
