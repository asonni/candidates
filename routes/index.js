const express = require('express');
const router = express.Router();
var login = require('../controller/login')(router);
const qualifications = require('../qualifications');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/qualifications', (req, res, next) => {
  res.send(qualifications);
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
