var model = require('../models');
const ElectionMgr = require('../controller/elections');
var log = null;

module.exports = {
  newLog: function(body, cb) {
    var obj = body;
    ElectionMgr.getLastElection(Lelection=>{
      obj.election =Lelection._id,
      log = new model.Log(obj);
      log.save(function(err) {
        if (!err) {
          cb({ result: true, err: 0 });
        } else {
          // console.log(err);
          cb({ result: false, err: 2 });
        }
      });
    });
    
  },
  getAllLog: function(limit, page, cb) {
    page = parseInt(page);
    page -= 1;
    limit = parseInt(limit);
    var q = {};
    model.Log.count(q, function(err, count) {
      model.Log
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
  }
  
};
