var model = require('../models');
module.exports = {
  getAllOffices: function(cb) {
    model.Office
      .find({status:1}, function(err, result) {
        if (!err) {
          cb(result);
        } else {
          // console.log(err);
          cb(null);
        }
    });
  }
};
