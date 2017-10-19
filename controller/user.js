var generatePassword = require('password-generator'),
  easyPbkdf2 = require('easy-pbkdf2')(),
  user = null;
var model = require('../models');

module.exports = {
  getAllUser: function(limit, page, cb) {
    page = parseInt(page);
    page -= 1;
    limit = parseInt(limit);
    model.User.count({status:1}, function(err, count) {
      model.User
        .find({status:1})
        .limit(limit)
        .skip(page * limit)
        .exec(function(err, users) {
          if (!err) {
            cb({ result: users, count: count });
          } else {
            console.log(err);
            cb(null);
          }
        });
    });
  },

  getUser: function(username, cb) {
    model.User.findOne({ email: username ,status:1}, function(err, user) {
      if (!err) {
        cb(user);
      } else {
        cb(null);
      }
    });
  },

  getUserId: function(id, cb) {
    model.User.findOne({ _id: id,status:1 }, function(err, user) {
      if (!err) {
        cb(user);
      } else {
        cb(null);
      }
    });
  },
  /* here we add a new user to the system */
  newUser: function (body, cb) {
    var salt = easyPbkdf2.generateSalt(); //we generate a new salt for every new user
    easyPbkdf2.secureHash( body.password, salt, function( err, passwordHash, originalSalt ) {
      var obj={
        name: body.name,
        email : body.email,
        password : passwordHash,
        salt : originalSalt,
        phone: body.phone,
        office :body.office,
        level : body.level
      };
      user = new model.User(obj);
      user.save(function(err,result){
        if (!err) {
          delete result.password;
          delete result.salt;
          cb(result);
        } else {
          //TODO: return page with errors
          console.log(err);
          cb(false);
        }
      });
    });
  },

  deleteUser : function(id,cb){
    model.User.findOneAndUpdate({_id:id},{status:0} function(err,result) {
      if (!err) {
        cb(result);
      } else {
        console.log(err);
        cb(false);
      }
    });

  },

  updateUser : function(id,body,cb){
    var salt = easyPbkdf2.generateSalt(); //we generate a new salt for every new user
    easyPbkdf2.secureHash(body.password, salt, function( err, passwordHash, originalSalt ) {
    var obj ={
      name: body.name,
      email : body.email,
      password : passwordHash,
      salt : originalSalt,
      phone: body.phone,
      office :body.office,
      level : body.level
    }
    model.User.findOneAndUpdate({_id:id,status:1}, obj, function(err,result) {
      if (!err) {
        cb(true)
      } else {
        console.log(err);
        cb(false);
      }
    });
  });
  },


};
