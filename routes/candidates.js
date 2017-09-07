var express = require('express');
var router = express.Router();
var CandidatesMgr = require("../controller/candidates");
var ElectionMgr = require("../controller/elections");
var AttachmentsMgr = require("../controller/attachments");
var CompetitionsMgr = require("../controller/competitions");
var userHelpers = require("../controller/userHelpers");





router.get('/all', userHelpers.isLogin,function(req, res){
  CandidatesMgr.getAllCandidates(function(Candidates){
    res.send(Candidates);
  });
});

/* Add new Candidates  */
router.post('/add',userHelpers.isLogin,function(req, res) {
  CandidatesMgr.addCandidate(req.body,function(newCandidate){
    res.send(newCandidate);
  });
});

// /* Edit Candidates by id  */
router.put('/edit/:id',userHelpers.isLogin,function(req, res) {
  CandidatesMgr.updateCandidate(req.params.id,req.body,function(returnCandidate){
    res.send(returnCandidate);
  });
});

router.get('/getAttachment', userHelpers.isLogin,function(req, res){
  ElectionMgr.getLastElection(function(election){
    AttachmentsMgr.getAttachmentElection(election._id,function(attachments){
      res.send(attachments);
    });
  });
});

router.get('/getCompetition', userHelpers.isLogin,function(req, res){
  ElectionMgr.getLastElection(function(election){
    CompetitionsMgr.getCompetitionsElection(election._id,function(competitions){
      res.send(competitions);
    });
  });
});
// /* Delete Candidates by id  */
// router.delete('/delete/:id',userHelpers.isAdmin,userHelpers.isLogin , function(req, res) {
//   CandidatesMgr.deleteCandidate(req.params.id,function(Candidate){
//     res.send({result:Candidate});
//   });
// });

// /*GET all Candidates By Search Value*/
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  CandidatesMgr.getAllCandidatesBySearchValue(-1,-1,req.params.searchValue,req.params.limit,req.params.page,function(Candidates){
    res.send(Candidates);
  });
});


// /* GET Candidates by ID  */
router.get('/:id',userHelpers.isLogin , function(req, res) {
  CandidatesMgr.getCandidateId(req.params.id,function(Candidate){
    res.send(Candidate);
  });
});




module.exports = router;
