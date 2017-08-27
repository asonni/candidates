var express = require('express');
var router = express.Router();
var ElectionMgr = require("../controller/elections");
var userHelpers = require("../controller/userHelpers");





router.get('/all', userHelpers.isLogin,function(req, res){
  ElectionMgr.getAllCandidates(function(Candidates){
    res.send(Candidates);
  });
});

router.post('/new',userHelpers.isLogin,function(req, res) {
  ElectionMgr.newElection(req.body,function(newElection){
    res.send(newElection);
  });
});

router.put('/:id',userHelpers.isLogin,function(req, res) {
  ElectionMgr.updateElection(req.params.id,req.body,function(elections){
    res.send(elections);
  });
});



router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  ElectionMgr.getAllElection(req.params.limit,req.params.page,function(elections){
    res.send(elections);
  });
});


router.get('/:id',userHelpers.isLogin , function(req, res) {
  ElectionMgr.getCandidateId(req.params.id,function(Candidate){
    res.send(Candidate);
  });
});

module.exports = router;
