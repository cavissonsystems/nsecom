var netjsagent = require('netjsagent').instrument({logLevel:'debug',BCILoggingMode : 'FILE'});      // for instrumenting application

process.on('uncaughtException', function (err) {
  console.log((new Date).toUTCString() + ' uncaughtException:', err.message);
  console.log(err.stack);
});

try {
  var mongoose = require('./model/db'),
      blob = require('./model/blobs'),
      employeSchema = require('./model/employeSchema'),
      user = require('./model/user');
}
catch(e){console.log(e)}

var express = require('express');
var app = express();
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var session      = require('express-session');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bCrypt = require('bcrypt-nodejs')
app.use(session({ secret: 'nodejs',resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


var bodyParser = require('body-parser');
//var routes = require('./routes/index');
var users = require('./routes/users');
var nsecomm = require('./routes/nsecomm');
var checkOutOrder = require('./routes/checkOutAndPlaceOrder');
var manyTier = require('./routes/manyTier');
var multiClient = require('./routes/multiCallOut');
var tierCallout_mongodb = require('./routes/mongoDB');
var tierCallout_postgres = require('./routes/postgreSQL');
var redis = require('./routes/redisRouter');
var home = require('./routes/home');
var search = require('./routes/search');
var productPage = require('./routes/productPage');
var addToBag = require('./routes/addToBag');
var shippingAddress = require('./routes/shippingAddress');
var checkOut = require('./routes/checkOut');
var routes = require('./routes/authenticate.js');
var checkInventory = require('./routes/checkInventory');
var executeBatchJob = require('./routes/executeBatchJob');
var memcache = require('./routes/memcacheDB');
//var socketio = require('./routes/socketio');
var net = require('./routes/net');
var zoo  = require('./routes/zookeeperCall');
var zlib = require('./routes/zlib');
var uzlib = require('./routes/uzlib');
var crypto = require('./routes/crypto')
var timer = require('./routes/timer')


app.set('views', path.join(__dirname, 'views'));
// view engine setup
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
    //req.db = db;
    next();
});


app.use('/', routes);
app.use('/users', users);
app.use('/nsecomm', nsecomm);
app.use('/nsecomm/checkOutAndPlaceOrder',checkOutOrder);
app.use('/nsecomm/manyTier',manyTier);
app.use('/nsecomm/HttpCallout',multiClient);
app.use('/nsecomm/mongodb',tierCallout_mongodb);
app.use('/nsecomm/postgres',tierCallout_postgres);
app.use('/nsecomm/redis',redis);
app.use('/nsecomm/home',home);
app.use('/nsecomm/searchProduct',search);
app.use('/nsecomm/productPage',productPage);
app.use('/nsecomm/addToBag',addToBag);
app.use('/nsecomm/shippingAddress',shippingAddress);
app.use('/nsecomm/checkOut',checkOut);
app.use('/nsecomm/user',user);
app.use('/nsecomm/checkInventory',checkInventory);
app.use('/nsecomm/executeBatchJob',executeBatchJob);
app.use('/nsecomm/memcache',memcache);
//app.use('/nsecomm/socketio',socketio);
app.use('/nsecomm/net',net);
app.use('/nsecomm/zoo',zoo);
app.use('/nsecomm/zlib',zlib);
app.use('/nsecomm/uzlib',uzlib);
app.use('/nsecomm/crypto',crypto);
app.use('/nsecomm/timer',timer);

//app.use('/nsecomm/authenticate',authenticate);


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
