var model = require('../models');
var election = null;

module.exports = {
  newElection: function(body, cb) {
    var obj = body;
    election = new model.Elections(obj);
    election.save(function(err) {
      if (!err) {
        cb({ result: election, err: 0 });
      } else {
        // console.log(err);
        cb({ result: false, err: 2 });
      }
    });
  },
  getElection: function( cb) {
    model.Elections.find({status:1}).exec(function(err, elections) {
      if (!err) {
        cb(elections);
      } else {
        // console.log(err);
        cb(null);
      }
    });
  },
  getAllElection: function(limit, page, cb) {
    page = parseInt(page);
    page -= 1;
    limit = parseInt(limit);
    var q = {status:1};
    model.Elections.count(q, function(err, count) {
      model.Elections
        .find(q)
        .limit(limit)
        .skip(page * limit)
        .exec(function(err, elections) {
          if (!err) {
            cb({ result: elections, count: count });
          } else {
            // console.log(err);
            cb(null);
          }
        });
    });
  },
  updateElection: function(id, body, cb) {
    var obj = body;
    model.Elections.findOneAndUpdate({ _id: id,status:1 }, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getLastElection: function(cb) {
    model.Elections.findOne({status:1}).sort({ _id: -1 }).exec(function(err, elections) {
      if (!err && elections != null) {
        cb(elections);
      } else {
        cb(false);
      }
    });
  },
  deleteElection : function(id, cb) {
    model.Competition.find({ election: id ,status:1}, function(err, competition) {
      if (!err) {
        if(competition.length){
          cb({ result: false, err: 2 });
        }else{
          model.Attachment.find({ election: id ,status:1}, function(err, attachment) {
            if (!err) {
              if(competition.length){
                cb({ result: false, err: 2 });
              }else{
                model.Candidates.find({ election: id,status:1}, function(err,candidates) {
                  if (!err) {
                    if(candidates.length){
                      cb({ result: false, err: 2 });
                    }else{
                      model.Elections.findOneAndUpdate({ _id: id }, {status:0}, function(err,election) {
                        if (!err) {
                          cb({ result: election, err: 0 });
                        } else {
                          cb({ result: false, err: 3 });
                        }
                      });
                    }
                  } else {
                    cb({ result: false, err: 3 });
                  }
                });
              }
            } else {
              cb({ result: 3 });
            }
          });
        }
        
      } else {
        cb({ result: 3 });
      }
    });
    

  }
};
