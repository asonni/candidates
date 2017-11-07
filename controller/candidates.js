var model = require('../models');
var candidates = null;

module.exports = {
  getCandidateId: function(id, cb) {
    model.Candidates.findOne({ _id: id,status:1 }, function(err, result) {
      if (!err) {
        cb(result);
      } else {
        cb(null);
      }
    });
  },
  getAllCandidates: function(user,limit,page,cb) {
    page = parseInt(page);
    page -= 1;
    limit = parseInt(limit);
    var q = {status:1};
    if(user.level == 3){
      q.office = user.office;
    }
    model.Candidates.count(q, function(err, count) {
      model.Candidates
        .find(q)
        .limit(limit)
        .skip(page * limit)
        .exec(function(err, candidates) {
          if (!err) {
            cb({ result: candidates, count: count });
          } else {
            // console.log(err);
            cb(null);
          }
        });
    });
  },

  addCandidate: function(body, cb) {
    var obj = body;
    candidates = new model.Candidates(obj);
    candidates.save(function(err,result) {
      if (!err) {
        cb({ result: result, err: 0 });
      } else {
        console.log(err);
        cb({ result: false, err: 2 });
      }
    });
  },
  updateCandidate: function(id, body, cb) {
    var obj = body;
    model.Candidates.findOneAndUpdate({ _id: id,status:1 }, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getAllCandidatesBySearchValue: function(user,body,limit,page,cb) {
    page = parseInt(page);
    page -= 1;
    limit = parseInt(limit);
    q = {
      status: 1,
    };
    if(user.level == 3){
      q.office = user.office;
    }
    if(body.nid ){
      q.nid= new RegExp(body.nid, 'i')
    }
    if(body.cra ){
      q.cra= new RegExp(body.cra, 'i')
    }
    if(body.f_name ){
      q.f_name= new RegExp(body.f_name, 'i')
    }
    if(body.p_name ){
      q.p_name= new RegExp(body.p_name, 'i')
    }
    if(body.g_name ){
      q.g_name= new RegExp(body.g_name, 'i')
    }
    if(body.l_name ){
      q.l_name= new RegExp(body.l_name, 'i')
    }
    if(body.mother_name ){
      q.mother_name= new RegExp(body.mother_name, 'i')
    }
    if(body.gender ){
      q.gender=body.gender
    }
    if(body.birth_day ){
      q.birth_day= body.birth_day
    }
    if(body.competition ){
      q.competition= body.competition
    }
    if(body.phone ){
      q.phone= body.phone
    }
    if(body.work_phone ){
      q.work_phone= body.work_phone
    }
    if(body.email ){
      q.email= body.email
    }
    if(body.cra ){
      q.cra= new RegExp(body.cra, 'i')
    }
    if(body.qualification ){
      q.qualification= body.qualification
    }
    if(body.specialty ){
      q.specialty= body.specialty
    }
    if(body.account_number ){
      q.account_number= body.account_number
    }
    if(body.selectedElection ){
      q.election= body.selectedElection
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
