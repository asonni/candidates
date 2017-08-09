var generatePassword = require('password-generator'),
    easyPbkdf2 = require("easy-pbkdf2")(),
    user = null;
var model = require("../models");


module.exports = {
  getAllUser :function(limit,page,cb){
    page = parseInt(page);
    page-=1;
    limit = parseInt(limit);
    model.User.count({},function(err,count){
      model.User.find({}).limit(limit).skip(page*limit).exec(function(err, users){
        if(!err){
          cb({result:users,count:count});
        }else{
          console.log(err);
          cb(null);
        }
      });
    });
  },

  getUser :function(username,cb){
    model.User.findOne({email : username}, function(err, user){
      if(!err){
        cb(user);
      }else{
        cb(null);
      }
    });
  },

  getUserId :function(id,cb){
    model.User.findOne({_id : id}, function(err, user){
      if(!err){
        cb(user);
      }else{
        cb(null);
      }
    });
  },
  /* here we add a new user to the system */
  // register: function (body, cb) {
  //   var salt = easyPbkdf2.generateSalt(); //we generate a new salt for every new user
  //   easyPbkdf2.secureHash( body.password, salt, function( err, passwordHash, originalSalt ) {
  //     var obj={
  //       name: body.name,
  //       email : body.email,
  //       password : passwordHash,
  //       salt : originalSalt,
  //       phone: body.phone,
  //       permission: body.permission,
  //       type: body.type

  //     };
  //     console.log(obj);
  //     user = new model.User(obj);
  //     user.save(function(err,result){
  //       if (!err) {
  //         delete result.password;
  //         delete result.salt;
  //         cb(result);
  //       } else {
  //         //TODO: return page with errors
  //         console.log(err);
  //         cb(false);
  //       }
  //     });
  //   });
  // },




  // deleteUser : function(id,cb){
  //   model.User.remove({_id:id}, function(err,result) {
  //     if (!err) {
  //       cb(2);
  //     } else {
  //       console.log(err);
  //       cb(3);
  //     }
  //   });

  // },


  // updateUser : function(id,body,cb){
  //   var salt = easyPbkdf2.generateSalt(); //we generate a new salt for every new user
  //   easyPbkdf2.secureHash(body.password, salt, function( err, passwordHash, originalSalt ) {
  //   var obj ={
  //     name : body.name,
  //     email : body.email,
  //     phone : body.phone,
  //     password: passwordHash,
  //     salt: originalSalt
  // }
  //   model.User.findOneAndUpdate({_id:id}, obj, function(err,result) {
  //     if (!err) {
  //       cb(true)
  //     } else {
  //       console.log(err);
  //       cb(false);
  //     }
  //   });
  // });
  // },

  // /* here we add a new user to the system */
  // changePassword: function (id, cb) {
  //   var salt = easyPbkdf2.generateSalt(), //we generate a new salt for every new user
  //       password = generatePassword(10,false); //we generate a new password for every new user
  //   easyPbkdf2.secureHash(password, salt, function( err, passwordHash, originalSalt ) {
  //     var obj={
  //       password : passwordHash,
  //       salt : originalSalt,
  //     };
  //     model.User.findOne({_id : id}, function(err, user){
  //       if(!err && user != null){
  //         user.password = passwordHash;
  //         user.salt = originalSalt;
  //         user.save(function(err,result){
  //           if (!err) {
  //             delete result.password;
  //             delete result.salt;
  //             cb(password);
  //           } else {
  //             //return page with errors
  //             console.log(err)
  //             cb(null);
  //           }
  //         });
  //       } else {
  //         cb(null);
  //       }
  //     });
  //   });
  // },

  
};



