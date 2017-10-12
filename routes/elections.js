const express = require('express');
const router = express.Router();
const ElectionMgr = require('../controller/elections');
const userHelpers = require('../controller/userHelpers');



router.get('/', userHelpers.isLogin, (req, res) => {
  ElectionMgr.getElection( elections => {
    res.send(elections);
  });
});
router.post('/', userHelpers.isLogin, (req, res) => {
  if(userHelpers.isName(req.body.name)){
    ElectionMgr.newElection(req.body, newElection => {
      res.send(newElection);
    });
  }else{
    res.send({ result: false, err: 1 });
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
