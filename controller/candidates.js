var model = require('../models');
var candidates = null;

module.exports = {
  getCandidateId: function(id, cb) {
    model.Candidates.findOne({ _id: id }, function(err, result) {
      if (!err) {
        cb(result);
      } else {
        cb(null);
      }
    });
  },
  getAllCandidates: function(cb) {
    model.Candidates.find(function(err, candidates) {
      if (!err) {
        cb(candidates);
      } else {
        // console.log(err);
        cb(null);
      }
    });
  },

  addCandidate: function(body, cb) {
    var obj = body;
    candidates = new model.Candidates(obj);
    candidates.save(function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  updateCandidate: function(id, body, cb) {
    var obj = body;
    model.Candidates.findOneAndUpdate({ _id: id }, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getAllCandidatesBySearchValue: function(
    election,
    office,
    searchValue,
    limit,
    page,
    cb
  ) {
    page = parseInt(page);
    page -= 1;
    limit = parseInt(limit);
    var q = {
      status: 1,
      $or: [
        { f_name: new RegExp(searchValue, 'i') },
        { p_name: new RegExp(searchValue, 'i') },
        { g_name: new RegExp(searchValue, 'i') },
        { l_name: new RegExp(searchValue, 'i') }
      ]
    };
    if (election != -1) {
      q.election = election;
    }
    if (office != -1) {
      q.office = office;
    }
    model.Candidates.count(q, function(err, count) {
      model.Candidates
        .find(q)
        .limit(limit)
        .skip(page * limit)
        .exec(function(err, results) {
          if (!err) {
            cb({ result: results, count: count });
          } else {
            // console.log(err);
            cb(null);
          }
        });
    });
  }
};
