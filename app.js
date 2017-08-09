const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
// var assert = require('assert');

var MongoDBStore = require('connect-mongodb-session')(session);

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/Candidates',
  collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});
app.use(session(
  { store: store, 
    secret: 'SEKR37',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    resave: true,
    saveUninitialized: true 
  }
));
app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
