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
    model.Elections.find({}).exec(function(err, elections) {
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
    var q = {};
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
    model.Elections.findOneAndUpdate({ _id: id }, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getLastElection: function(cb) {
    model.Elections.findOne().sort({ _id: -1 }).exec(function(err, elections) {
      if (!err && elections != null) {
        cb(elections);
      } else {
        cb(false);
      }
    });
  }
};
