const express = require('express');
const router = express.Router();
const login = require('../controller/login')(router);
const qualifications = require('../qualifications');
const userHelpers = require('../controller/userHelpers');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/qualifications', (req, res, next) => {
  res.send(qualifications);
});

router.get('/home', userHelpers.isLogin, (req, res, next) => {
  res.render('index');
});

router.get('/current_user', (req, res, next) => {
  if (req.isAuthenticated()) {
    const { level, name, office, email, phone } = req.user;
    res.send({
      level,
      name,
      office,
      email,
      phone
    });
  } else {
    res.send({
      level: 0,
      name: null,
      office: 0,
      email: null,
      phone: null
    });
  }
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
