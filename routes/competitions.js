var express = require('express');
var router = express.Router();
var CompetitionsMgr = require("../controller/competitions");
var userHelpers = require("../controller/userHelpers");







router.post('/',userHelpers.isLogin,function(req, res) {
  CompetitionsMgr.newCompetition(req.body,function(newCompetition){
    res.send(newCompetition);
  });
});

router.put('/:id',userHelpers.isLogin,function(req, res) {
  CompetitionsMgr.updateCompetition(req.params.id,req.body,function(competitions){
    res.send(competitions);
  });
});



router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  CompetitionsMgr.getAllCompetition(req.params.limit,req.params.page,function(competitions){
    res.send(competitions);
  });
});


router.get('/:id',userHelpers.isLogin , function(req, res) {
  CompetitionsMgr.getCompetitionId(req.params.id,function(competitions){
    res.send(competitions);
  });
});

module.exports = router;
