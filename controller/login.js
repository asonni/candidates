var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  easyPbkdf2 = require('easy-pbkdf2')();
var mongoose = require('mongoose');
var model = require('../models');
var User = require('../controller/user');
const LogMgr = require('../controller/logs');

//read the passport api docs if you wanna know what this does
passport.use(
  new LocalStrategy(function(username, password, done) {
    findByUserName(username, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      authenticate(user, password, function(valid) {
        if (valid) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

//read the passport api docs if you wanna know what this does
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

//read the passport api docs if you wanna know what this does
passport.deserializeUser(function(id, done) {
  findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = function(router) {
  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ login: 2 });
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        LogMgr.newLog({
        user_iduser :req.user._id,
        office :req.user.office,
        type :"login",
        table :"user",
        desc :req.user.name+" has login ",
        table_idtable :req.user._id,
        value: req.user.name
      },log =>{
        return res.send({ login: true, admin: user.level });
      });
        

      });
    })(req, res, next);
  });

  // here if a user wants to logout of the app
  router.get('/logout', ensureAuthenticated, function(req, res) {
    LogMgr.newLog({
        user_iduser :req.user._id,
        office :req.user.office,
        type :"login",
        table :"user",
        desc :req.user.name+" has logout ",
        table_idtable :req.user._id,
        value: req.user.name
      },log =>{
        req.session.destroy();
        res.redirect('/');
      });
    
  });
  return router;
};

function findById(id, fn) {
  User.getUserId(id, function(user) {
    if (user) {
      fn(null, user);
    } else {
      fn(new Error('User ' + id + ' does not exist'));
    }
  });
}

function findByUserName(username, fn) {
  User.getUser(username, function(user) {
    if (user) {
      fn(null, user);
    } else {
      return fn(null, null);
    }
  });
}

function authenticate(user, userEnteredPassword, callback) {
  // make sure the user-entered password is equal to the previously
  // created hash when hashed with the same salt.
  easyPbkdf2.verify(user.salt, user.password, userEnteredPassword, function(
    err,
    valid
  ) {
    if (err) {
      console.log(err);
    } else {
      callback(valid);
    }
  });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
