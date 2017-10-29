const express = require('express');
const router = express.Router();
const ElectionMgr = require('../controller/elections');
const userHelpers = require('../controller/userHelpers');
const LogMgr = require('../controller/logs');



router.get('/', userHelpers.isLogin, (req, res) => {
  ElectionMgr.getElection( elections => {
    res.send(elections);
  });
});
router.post('/', userHelpers.isLogin, (req, res) => {
  if(userHelpers.isName(req.body.name)){
    ElectionMgr.newElection(req.body, newElection => {
      LogMgr.newLog({
        user_iduser :req.user._id,
        office :req.user.office,
        type :"add",
        table :"Election",
        desc :"add new election name : "+req.body.name,
        table_idtable : newElection.result._id,
        value: req.body.name
      },log =>{
        res.send(newElection);
      });
  });
  }else{
    res.send({ result: false, err: 4 });
  }
  
});

router.put('/:id', userHelpers.isLogin, (req, res) => {
  ElectionMgr.updateElection(req.params.id, req.body, elections => {
    res.send(elections);
  });
});

router.get('/:limit/:page', userHelpers.isLogin, (req, res) => {
  ElectionMgr.getAllElection(req.params.limit, req.params.page, elections => {
    res.send(elections);
  });
});

router.get('/:id', userHelpers.isLogin, (req, res) => {
  ElectionMgr.getCandidateId(req.params.id, Candidate => {
    res.send(Candidate);
  });
});

module.exports = router;
