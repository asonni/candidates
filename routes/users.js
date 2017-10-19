const express = require('express');
const router = express.Router();
const UserMgr = require('../controller/user');
const userHelpers = require('../controller/userHelpers');
const OfficeMgr = require('../controller/offices');



router.get('/offices', userHelpers.isLogin, (req, res) => {
  OfficeMgr.getAllOffices(
    offices => {
      res.send(offices);
    }
  );
});
router.post('/', userHelpers.isLogin, (req, res) => {
UserMgr.newUser(req.body, newUser => {
  res.send(newUser);
});
});
router.put('/:id', userHelpers.isLogin, (req, res) => {
  UserMgr.updateUser(req.params.id, req.body, user => {
    res.send(user);
  });
});
router.get('/:limit/:page', userHelpers.isLogin, (req, res) => {
  UserMgr.getAllUser(
    req.params.limit,
    req.params.page,
    user => {
      res.send(user);
    }
  );
});
router.get('/:id', userHelpers.isLogin, (req, res) => {
	console.log("im in user");
  UserMgr.getUserId(req.params.id, user => {
    res.send(user);
  });
});
module.exports = router;
