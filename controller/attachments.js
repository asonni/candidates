var model = require('../models');
var attachment = null;
module.exports = {
  newAttachment: function(body, cb) {
    var obj = body;
    model.Elections.findOne().sort({ _id: -1 }).exec(function(err, elections) {
      if (!err) {
        if (elections != null) {
          obj['election'] = elections._id;
          attachment = new model.Attachment(obj);
          attachment.save(function(err) {
            if (!err) {
              cb({ result: true, err: 0 });
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
  getAllAttachment: function(limit, page, cb) {
    page = parseInt(page);
    page -= 1;
    limit = parseInt(limit);
    var q = {};
    model.Attachment.count(q, function(err, count) {
      model.Attachment
        .find(q)
        .limit(limit)
        .skip(page * limit)
        .exec(function(err, attachments) {
          if (!err) {
            cb({ result: attachments, count: count });
          } else {
            // console.log(err);
            cb(null);
          }
        });
    });
  },
  updateAttachment: function(id, body, cb) {
    var obj = body;
    model.Attachment.findOneAndUpdate({ _id: id }, obj, function(err) {
      if (!err) {
        cb(true);
      } else {
        // console.log(err);
        cb(false);
      }
    });
  },
  getAttachmentId: function(id, cb) {
    model.Attachment.findOne({ _id: id }, function(err, result) {
      if (!err) {
        cb(result);
      } else {
        cb(null);
      }
    });
  },
  searchAttachment: function(election,limit, page, cb) {
    page = parseInt(page);
    page -= 1;
    limit = parseInt(limit);
    if(election != -1){
      var q ={
        election:election
      };
    }else{
      var q = {};  
    }
    
    model.Attachment.count(q, function(err, count) {
      model.Attachment
        .find(q)
        .limit(limit)
        .skip(page * limit)
        .exec(function(err, Attachment) {
          if (!err) {
            cb({ result: Attachment, count: count });
          } else {
            // console.log(err);
            cb(null);
          }
        });
    });
  },
  getAttachmentElection: function(id, cb) {
    model.Attachment.find({ election: id }, function(err, result) {
      if (!err) {
        cb(result);
      } else {
        cb(null);
      }
    });
  }
};
