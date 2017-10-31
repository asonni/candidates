const express = require('express');
const router = express.Router();
const CompetitionsMgr = require('../controller/competitions');
const userHelpers = require('../controller/userHelpers');
const LogMgr = require('../controller/logs');

router.post('/', userHelpers.isLogin, (req, res) => {
  if(userHelpers.isName(req.body.name)){
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
          res.send(newCompetition);
        });
      }else{
        res.send(newCompetition);
      }
      
      
    });
  }else{
    res.send({ result: false, err: 4 });
  }
  
});

router.put('/:id', userHelpers.isLogin, (req, res) => {
  CompetitionsMgr.updateCompetition(req.params.id, req.body, competitions => {
    res.send(competitions);
  });
});
router.get('/search/:election/:text/:limit/:page', userHelpers.isLogin, (req, res) => {
  CompetitionsMgr.searchCompetition(req.params.election,req.params.text,req.params.limit,req.params.page,competitions => {
    res.send(competitions);
  });
});
router.get('/:limit/:page', userHelpers.isLogin, (req, res) => {
  CompetitionsMgr.getAllCompetition(
    req.params.limit,
    req.params.page,
    competitions => {
      res.send(competitions);
    }
  );
});

router.get('/:id', userHelpers.isLogin, (req, res) => {
  CompetitionsMgr.getCompetitionId(req.params.id, competitions => {
    res.send(competitions);
  });
});

router.delete('/:id',userHelpers.isLogin ,  (req, res) => {
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
        res.send(competitions);
      });
    }else{
      res.send(competitions)
    }
  });
});
module.exports = router;
