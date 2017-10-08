const express = require('express');
const router = express.Router();
const CompetitionsMgr = require('../controller/competitions');
const userHelpers = require('../controller/userHelpers');

router.post('/', userHelpers.isLogin, (req, res) => {
  CompetitionsMgr.newCompetition(req.body, newCompetition => {
    res.send(newCompetition);
  });
});

router.put('/:id', userHelpers.isLogin, (req, res) => {
  CompetitionsMgr.updateCompetition(req.params.id, req.body, competitions => {
    res.send(competitions);
  });
});
router.get('/search/:election/:limit/:page', userHelpers.isLogin, (req, res) => {
  CompetitionsMgr.searchCompetition(req.params.election,req.params.limit,req.params.page,competitions => {
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

module.exports = router;
