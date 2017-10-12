var fs = require("fs");
var path = require("path");
var validator = require('validator');

module.exports = {
  /* here we check if the user have root access */
  isLogin : function (req,res,next) {
    // if (req.isAuthenticated()) {
    // return next();
    // }
    // res.redirect('/');
    return next();
  },
  isEmails: function (email) {
    return validator.isEmail(email);
  },
  isName : function(name){
    return validator.isAlpha(name,['ar']);
  },
  isNid :function(nid){
    return validator.isInt(nid,[{ min: 12, max: 12 }])
  },
  isCra :function(cra){
    return validator.isInt(cra,[{ min: 1, max: 12 }])
  },
  isPhone :function(phone){
    return validator.isInt(phone,[{ min: 9, max: 12 }])
  },
  isG : function(g){
    return validator.isCurrency(g,{digits_after_decimal:[1,2]})
  },
  isForm : function(body){
    

  },
 // isAdmin : function (req,res,next) {
 //    if (req.isAuthenticated()&&req.user.level==1) {
 //    return next();
 //    }
 //    res.redirect('/');
 //     /*return next();*/
 //  },
  
};
