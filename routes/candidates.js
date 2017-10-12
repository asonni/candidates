const express = require('express');
const router = express.Router();
const CandidatesMgr = require('../controller/candidates');
const ElectionMgr = require('../controller/elections');
const AttachmentsMgr = require('../controller/attachments');
const CompetitionsMgr = require('../controller/competitions');
const userHelpers = require('../controller/userHelpers');
var validator = require('validator');
router.get('/:limit/:page', userHelpers.isLogin, (req, res) => {
  CandidatesMgr.getAllCandidates(req.params.limit,req.params.page,Candidates => {
    res.send(Candidates);
  });
});

/* Add new Candidates  */
router.post('/', userHelpers.isLogin, (req, res) => {
  console.log(req.body)
  CandidatesMgr.addCandidate(req.body, newCandidate => {
    res.send(newCandidate);
  });
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
  console.log(userHelpers.isG('7'));
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
router.get('/get/:election/:office/:searchValue/:limit/:page', userHelpers.isLogin, (req, res) => {
  CandidatesMgr.getAllCandidatesBySearchValue(
    req.params.election,
    req.params.office,
    req.params.searchValue,
    req.params.limit,
    req.params.page,
    function(Candidates) {
      res.send(Candidates);
    }
  );
});

// /* GET Candidates by ID  */
router.get('/:id', userHelpers.isLogin, (req, res) => {
  CandidatesMgr.getCandidateId(req.params.id, Candidate => {
    res.send(Candidate);
  });
});

module.exports = router;
