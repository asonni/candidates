const express = require('express');
const router = express.Router();
const CompetitionsMgr = require('../controller/competitions');
const userHelpers = require('../controller/userHelpers');
const LogMgr = require('../controller/logs');
const errorlog = require('../routes/logger').errorlog;
const successlog = require('../routes/logger').successlog;

// Add new Competition 
router.post('/', userHelpers.isLogin, (req, res) => {
  if(userHelpers.isName(req.body.name)){
    successlog.warn(`the ${req.user.email} try add Competition  ${req.body.name}`);
    CompetitionsMgr.newCompetition(req.body, newCompetition => {
      if(newCompetition.result){
        LogMgr.newLog({
          user_iduser :req.user._id,
          office :req.user.office,
          type :"add",
          table :"Competition",
          desc :"add new Competition name : "+req.body.name,
          table_idtable : newCompetition.result._id,
          value: req.body.name
        },log =>{
          successlog.info(`the ${req.user.email}  added Competition ${req.body.name}`);
          res.send(newCompetition);
        });
      }else{
        errorlog.error(`the ${req.user.email}   Competition ${req.body.name} not added `);
        res.send(newCompetition);
      }
    });
  }else{
    errorlog.error(`the ${req.user.email}   Competition ${req.body.name} not added validat err`);
    res.send({ result: false, err: 4 });
  }
});

//  Edit Competition by id 
router.put('/:id', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try edit Competition ${req.body.name}`);
  CompetitionsMgr.updateCompetition(req.params.id, req.body, competitions => {
    if(attachment){
      successlog.info(`the ${req.user.email}  edit Competition ${req.body.name}`);
      res.send(competitions);
    }else{
      errorlog.error(`the ${req.user.email} edit Competition ${req.body.name}`);
      res.send(competitions);
    }
  });
});

// GET all Competition By Search Value
router.get('/search/:election/:text/:limit/:page', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try get Competition search `);
  CompetitionsMgr.searchCompetition(req.params.election,req.params.text,req.params.limit,req.params.page,competitions => {
    if(competitions){
      successlog.info(`the ${req.user.email} get Competition search `);
      res.send(competitions);
    }else{
     errorlog.error(`the ${req.user.email} get Competition search `);
     res.send(competitions);
    }
  });
});

// GET  Competitions By limit
router.get('/:limit/:page', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try get Competitions `);
  CompetitionsMgr.getAllCompetition(
    req.params.limit,
    req.params.page,
    competitions => {
      if(competitions){
        successlog.info(`the ${req.user.email}  get Competitions`);
        res.send(competitions);
      }else{
        errorlog.error(`the ${req.user.email} get Competitions err`);
        res.send(competitions);
      }
    }
  );
});

//  GET Competition by ID 
router.get('/:id', userHelpers.isLogin, (req, res) => {
  successlog.warn(`the ${req.user.email} try get Competition `);
  CompetitionsMgr.getCompetitionId(req.params.id, competitions => {
    res.send(competitions);
    if(competitions){
      successlog.info(`the ${req.user.email}  get Competition ${competitions.name}`);
      res.send(competitions);
    }else{
      errorlog.error(`the ${req.user.email} get Competition err ${req.params.id}`);
      res.send(competitions);
    }
  });
});

//  Delete Competition by id 
router.delete('/:id',userHelpers.isLogin ,  (req, res) => {
  successlog.warn(`the ${req.user.email} try delete Competition ${req.params.id}`);
  CompetitionsMgr.deleteCompetition(req.params.id,competitions => {
    if(competitions.result){
      LogMgr.newLog({
        user_iduser :req.user._id,
        office :req.user.office,
        type :"delete",
        table :"Competitions",
        desc :"delete competitions name : "+competitions.result.name,
        table_idtable : competitions.result._id,
        value: competitions.result.name
      },log =>{
        successlog.info(`the ${req.user.email}  delete Competition ${req.params.id}`);
        res.send(competitions);
      });
    }else{
      errorlog.error(`the ${req.user.email}   Competition ${req.params.id} has been not deleted`);
      res.send(competitions)
    }
  });
});
module.exports = router;
