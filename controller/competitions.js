var model = require("../models");
var competition = null;

module.exports = {


  newCompetition : function(body,cb){
    var obj = body;
    model.Elections.findOne().sort({_id: -1}).exec(function(err,elections){
      if(!err){
        obj['election']=elections._id;
        competition = new model.Competition(obj);
        competition.save(function(err){
          if (!err) {
            cb(true);
          } else {
            // console.log(err);
            cb(false);
          }
        });
      }else{
        // console.log(err);
        cb(null);
      }
    });
    
  },
  getAllCompetition :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    var q= {};
    model.Competition.count(q,function(err, count){
      model.Competition.find(q).limit(limit).skip(page*limit).exec(function(err,competitions){
        if(!err){
          cb({result:competitions,count:count});
        }else{
          // console.log(err);
          cb(null);
        }
      });
    });
  },
  updateCompetition : function(id,body,cb){
    var obj = body;
    model.Competition.findOneAndUpdate({_id:id}, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
};

