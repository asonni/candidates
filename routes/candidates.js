const express = require('express');
const router = express.Router();
const CandidatesMgr = require('../controller/candidates');
const ElectionMgr = require('../controller/elections');
const AttachmentsMgr = require('../controller/attachments');
const CompetitionsMgr = require('../controller/competitions');
const userHelpers = require('../controller/userHelpers');
var validator = require('validator');


/* Add new Candidates  */
router.post('/', userHelpers.isLogin, (req, res) => {
  if(userHelpers.isForm(req.body)){
    ElectionMgr.getLastElection(election =>{
      req.body['election']=election._id;
      CandidatesMgr.addCandidate(req.body, newCandidate => {
        res.send(newCandidate);
      });
    });
    
  }else{
    res.send({ result: false, err: 4 });
  }
  
});

// /* Edit Candidates by id  */
router.put('/edit/:id', userHelpers.isLogin, (req, res) => {
  CandidatesMgr.updateCandidate(req.params.id, req.body, returnCandidate => {
    res.send(returnCandidate);
  });
});

router.get('/getAttachment', userHelpers.isLogin, (req, res) => {
  ElectionMgr.getLastElection(function(election) {
    AttachmentsMgr.getAttachmentElection(election._id, attachments => {
      res.send(attachments);
    });
  });
});

router.get('/getCompetition', userHelpers.isLogin, (req, res) => {
  ElectionMgr.getLastElection(function(election) {
    CompetitionsMgr.getCompetitionsElection(election._id, competitions => {
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
router.post('/get/:limit/:page', userHelpers.isLogin, (req, res) => {
  CandidatesMgr.getAllCandidatesBySearchValue(req.body,req.params.limit,req.params.page,function(Candidates) {
    res.send(Candidates);
  });
});
router.get('/:limit/:page', userHelpers.isLogin, (req, res) => {
  CandidatesMgr.getAllCandidates(req.params.limit,req.params.page,Candidates => {
    res.send(Candidates);
  });
});
// /* GET Candidates by ID  */
router.get('/:id', userHelpers.isLogin, (req, res) => {
  CandidatesMgr.getCandidateId(req.params.id, Candidate => {
    res.send(Candidate);
  });
});

module.exports = router;
