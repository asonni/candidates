var model = require('../models');
var competition = null;

module.exports = {
  newCompetition: function(body, cb) {
    var obj = body;
    model.Elections.findOne({status:1}).sort({ _id: -1 }).exec(function(err, elections) {
      if (!err) {
        if (elections != null) {
          obj['election'] = elections._id;
          competition = new model.Competition(obj);
          competition.save(function(err) {
            if (!err) {
              cb({ result: competition, err: 0 });
            } else {
              // console.log(err);
              cb({ result: false, err: 2 });
            }
          });
        } else {
          cb({ result: false, err: 3 });
        }
      } else {
        // console.log(err);
        cb({ result: false, err: 1 });
      }
    });
  },
  getAllCompetition: function(limit, page, cb) {
    page = parseInt(page);
    page -= 1;
    limit = parseInt(limit);
    var q = {status:1};
    model.Competition.count(q, function(err, count) {
      model.Competition
        .find(q)
        .limit(limit)
        .skip(page * limit)
        .exec(function(err, competitions) {
          if (!err) {
            cb({ result: competitions, count: count });
          } else {
            // console.log(err);
            cb(null);
          }
        });
    });
  },
  searchCompetition: function(election,text,limit, page, cb) {
    page = parseInt(page);
    page -= 1;
    limit = parseInt(limit);
    if(election != -1){
      var q ={
        election:election,
        status:1
      };
    }else{
      var q = {status:1};  
    }
    if(parseFloat(text) != -1 && text !=' '){
      q.name =new RegExp(text, 'i');
    }
    model.Competition.count(q, function(err, count) {
      model.Competition
        .find(q)
        .limit(limit)
        .skip(page * limit)
        .exec(function(err, competitions) {
          if (!err) {
            cb({ result: competitions, count: count });
          } else {
            // console.log(err);
            cb(null);
          }
        });
    });
  },
  updateCompetition: function(id, body, cb) {
    var obj = body;
    model.Competition.findOneAndUpdate({ _id: id,status:1}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getCompetitionId: function(id, cb) {
    model.Competition.findOne({ _id: id,status:1 }, function(err, result) {
      if (!err) {
        cb(result);
      } else {
        cb(null);
      }
    });
  },
  getCompetitionsElection: function(id, cb) {
    model.Competition.find({ election: id ,status:1}, function(err, result) {
      if (!err) {
        cb(result);
      } else {
        cb(null);
      }
    });
  },
  deleteCompetition : function(id, cb) {
    model.Candidates.find({ competition: id,status:1}, function(err, result) {
      if (!err) {
        if(result.length){
          cb({ result: false, err: 2 });
        }else{
          model.Competition.findOneAndUpdate({ _id: id }, {status:0}, function(err,competition) {
            if (!err) {
              cb({ result: competition, err: 0 });
            } else {
              // console.log(err);
              cb({ result: false, err: 3 });
            }
          });
        }
      } else {
        cb({ result: false, err: 3 });
      }
    });

  }
};
