const express = require('express');
const router = express.Router();
const UserMgr = require('../controller/user');
const userHelpers = require('../controller/userHelpers');
const OfficeMgr = require('../controller/offices');
const LogMgr = require('../controller/logs');


router.get('/offices', userHelpers.isLogin, (req, res) => {
  OfficeMgr.getAllOffices(
    offices => {
      res.send(offices);
    }
  );
});
router.post('/', userHelpers.isLogin, (req, res) => {
  UserMgr.newUser(req.body, newUser => {
    LogMgr.newLog({
        user_iduser :req.user._id,
        office :req.user.office,
        type :"add",
        table :"User",
        desc :"add new user name : "+req.body.name,
        table_idtable : newUser.result._id,
        value: req.body.name
      },log =>{
        res.send(newUser);
      });
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
  UserMgr.getUserId(req.params.id, user => {
    res.send(user);
  });
});
router.delete('/:id',userHelpers.isLogin ,  (req, res) => {
  UserMgr.deleteUser(req.params.id,user => {
    if(user.result){
      LogMgr.newLog({
        user_iduser :req.user._id,
        office :req.user.office,
        type :"delete",
        table :"User",
        desc :"delete user name : "+user.result.name,
        table_idtable : user.result._id,
        value: user.result.name
      },log =>{
        res.send(user);
      });
    }else{
      res.send(user);
    }
    
  });
});
module.exports = router;
