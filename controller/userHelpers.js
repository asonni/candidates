var jsreport = require("jsreport");
var fs = require("fs");
var path = require("path");

module.exports = {
  /* here we check if the user have root access */
  isLogin : function (req,res,next) {
    if (req.isAuthenticated()) {
    return next();
    }
    res.redirect('/');
    /* return next();*/
  },
 // isAdmin : function (req,res,next) {
 //    if (req.isAuthenticated()&&req.user.level==1) {
 //    return next();
 //    }
 //    res.redirect('/');
 //     /*return next();*/
 //  },
  
};
