const express = require('express');
const router = express.Router();
const CandidatesMgr = require('../controller/candidates');
const ElectionMgr = require('../controller/elections');
const AttachmentsMgr = require('../controller/attachments');
const CompetitionsMgr = require('../controller/competitions');
const userHelpers = require('../controller/userHelpers');
var validator = require('validator');
const LogMgr = require('../controller/logs');


/* Add new Candidates  */
router.post('/', userHelpers.isLogin, (req, res) => {
  var result=userHelpers.isForm(req.body);
  if(!result.length){
    ElectionMgr.getLastElection(election =>{
      req.body['election']=election._id;
      req.body['office']=req.user.office;
      CandidatesMgr.addCandidate(req.body, newCandidate => {
        if(newCandidate.result){
          LogMgr.newLog({
            user_iduser :req.user._id,
            office :req.user.office,
            type :"add",
            table :"Candidate",
            desc :"add new Candidate name : "+req.body.f_name+' '+req.body.p_name+' '+req.body.g_name+' '+req.body.l_name,
            table_idtable : newCandidate.result._id,
            value: req.body.name
          },log =>{
            res.send(newCandidate);
          });
        }else{
          res.send(newCandidate);
        }
      });
    });
    
  }else{
    res.send({ result: result, err: 4 });
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
  CandidatesMgr.getAllCandidatesBySearchValue(req.user,req.body,req.params.limit,req.params.page,function(Candidates) {
    res.send(Candidates);
  });
});
router.get('/:limit/:page', userHelpers.isLogin, (req, res) => {
  CandidatesMgr.getAllCandidates(req.user,req.params.limit,req.params.page,Candidates => {
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
