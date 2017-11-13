const express = require('express');
const router = express.Router();
const CandidatesMgr = require('../controller/candidates');
const ElectionMgr = require('../controller/elections');
const AttachmentsMgr = require('../controller/attachments');
const CompetitionsMgr = require('../controller/competitions');
const userHelpers = require('../controller/userHelpers');
var validator = require('validator');
const LogMgr = require('../controller/logs');
const errorlog = require('../routes/logger').errorlog;
const successlog = require('../routes/logger').successlog;

// Add new Candidates  
router.post('/', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try add a new  Candidate  ${req.body.f_name}`);
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
            successlog.info(`the ${req.user.email}  added Candidate ${req.body.f_name}`);
            res.send(newCandidate);
          });
        }else{
          errorlog.error(`the ${req.user.email}   Candidate ${req.body.f_name} not added `);
          res.send(newCandidate);
        }
      });
    });
  }else{
    errorlog.error(`the ${req.user.email}   Candidate ${req.body.f_name} not added validat err`);
    res.send({ result: result, err: 4 });
  }

});

//  Edit Candidates by id  
router.put('/edit/:id', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try edit Candidate `);
  CandidatesMgr.updateCandidate(req.params.id, req.body, returnCandidate => {
    if(returnCandidate){
      successlog.info(`the ${req.user.email}  edit Candidate ${req.body.f_name}`);
      res.send(returnCandidate);
    }else{
      errorlog.error(`the ${req.user.email} edit Candidate ${req.body.f_name}`);
      res.send(returnCandidate);
    }
  });
});

// GET all Candidates By Search Value
router.post('/get/:limit/:page', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try get Candidate search `);
  CandidatesMgr.getAllCandidatesBySearchValue(req.user,req.body,req.params.limit,req.params.page,function(Candidates) {
    if(Candidates){
      successlog.info(`the ${req.user.email} get Candidate search `);
      res.send(attachment);
    }else{
     errorlog.error(`the ${req.user.email} get Candidate search `);
     res.send(Candidates)
    }
  });
});

// GET  Candidates By limit
router.get('/:limit/:page', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try get Candidates `);
  CandidatesMgr.getAllCandidates(req.user,req.params.limit,req.params.page,Candidates => {
    if(Candidates){
      successlog.info(`the ${req.user.email}  get Candidates`);
      res.send(Candidates);
    }else{
      errorlog.error(`the ${req.user.email} get Candidates err`);
      res.send(Candidates);
    }
  });
});

//  GET Candidates by ID  
router.get('/:id', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try get Candidate ${req.params.id} `);
  CandidatesMgr.getCandidateId(req.params.id, Candidate => {
    if(Candidate){
      successlog.info(`the ${req.user.email}  get Candidate ${Candidate.name}`);
      res.send(Candidate);
    }else{
      errorlog.error(`the ${req.user.email} get Candidate err ${req.params.id}`);
      res.send(Candidate);
    }
  });
});

//  Delete Candidates by id  
// router.delete('/delete/:id',userHelpers.isAdmin,userHelpers.isLogin , function(req, res) {
//   CandidatesMgr.deleteCandidate(req.params.id,function(Candidate){
//     res.send({result:Candidate});
//   });
// });

// get attachment for Inputs
router.get('/getAttachment', userHelpers.isLogin, (req, res) => {
  ElectionMgr.getLastElection(function(election) {
    AttachmentsMgr.getAttachmentElection(election._id, attachments => {
      res.send(attachments);
    });
  });
});

// get Competition for Inputs
router.get('/getCompetition', userHelpers.isLogin, (req, res) => {
  ElectionMgr.getLastElection(function(election) {
    CompetitionsMgr.getCompetitionsElection(election._id, competitions => {
      res.send(competitions);
    });
  });
});

module.exports = router;
