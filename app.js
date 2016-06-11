var netjsagent = require('netjsagent').instrument();      // for instrumenting application
process.on('uncaughtException', function (err) {
  console.log((new Date).toUTCString() + ' uncaughtException:', err.message);
  console.log(err.stack);
  process.exit(1)
});

var express = require('express');
var path = require('path');
var domain = require('domain');

//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var nsecomm = require('./routes/nsecomm');
var checkOutOrder = require('./routes/checkOutAndPlaceOrder');
var manyTier = require('./routes/manyTier');
var multiClient = require('./routes/multiCallOut');
var tierCallout_yahoo = require('./routes/manyTier_yahoo');
                 // start cpu profiling

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/untitled1');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/nsecomm', nsecomm);
app.use('/nsecomm/checkOutAndPlaceOrder', checkOutOrder);
app.use('/nsecomm/manyTier', manyTier);
app.use('/nsecomm/HttpCallout',multiClient);
app.use('/nsecomm/manyTier_yahoo',tierCallout_yahoo);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//var cpuProfile = profiler.stopProfiling('app')
module.exports = app;
