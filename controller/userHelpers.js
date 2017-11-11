var fs = require('fs');
var path = require('path');
var validator = require('validator');

module.exports = {
  /* here we check if the user have root access */
  isLogin: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
    // return next();
  },
  isName: function(name) {
    return isNameAR(name);
  },
  isForm: function(body) {
    var errors =[];
    if(!isNid(body.nid)){
      errors.push("الرجاء ادخال الرقم الوطني بالشكل الصحيح");
    }
    if(!isCra(body.cra)){
      errors.push("الرجاء ادخال الرقم الوطني بالشكل الصحيح");
    }
    if(!isNameAR(body.f_name)){
      errors.push("الرجاء ادخال الرقم الوطني بالشكل الصحيح");
    }
    if(!isNameAR(body.p_name)){
      errors.push("الرجاء ادخال الرقم الوطني بالشكل الصحيح");
    }
    if(!isNameAR(body.g_name)){
      errors.push("الرجاء ادخال الرقم الوطني بالشكل الصحيح");
    }
    if(!isNameAR(body.l_name)){
      errors.push("الرجاء ادخال الرقم الوطني بالشكل الصحيح");
    }
    if(!isNameAR(body.mother_name)){
      errors.push("الرجاء ادخال الرقم الوطني بالشكل الصحيح");
    }
    if(!isPhone(body.phone)){
      errors.push("الرجاء ادخال الرقم الوطني بالشكل الصحيح");
    }
    if(!isPhone(body.work_phone)){
      errors.push("الرجاء ادخال الرقم الوطني بالشكل الصحيح");
    }
    if(!isEmail(body.email)){
      errors.push("الرجاء ادخال الرقم الوطني بالشكل الصحيح");
    }
    return errors;

  }
  // isAdmin : function (req,res,next) {
  //    if (req.isAuthenticated()&&req.user.level==1) {
  //    return next();
  //    }
  //    res.redirect('/');
  //     /*return next();*/
  //  },
};
function isNameAR(name) {
  return validator.isAlpha(name.replace(/\s/g, ''), ['ar']);
}
function isEmail(email) {
  return validator.isEmail(email);
}

function isNid(nid) {
  return validator.isInt(nid, { min: 12, max: 12 });
}
function isCra(cra) {
  return validator.isInt(cra, { min: 1, max: 12 });
}
function isPhone(phone) {
  return validator.isInt(phone, { min: 9, max: 12 });
}
function isG(g) {
  return validator.isCurrency(g, { digits_after_decimal: [1, 2] });
}
