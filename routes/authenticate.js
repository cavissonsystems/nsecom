var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    Account = require('../model/user');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res){
    res.render('signup');
});

router.post('/signup', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('signup', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/login');
        });
    });
});

router.get('/login', function(req, res){
    res.render('login');
});
router.get('/logout', function(req, res) {
    req.session.userName='';
    req.logout();
    res.redirect('/nsecomm/home');
});


router.post('/login', function(req, res) {
    passport.authenticate('local', function(err, user, info) {
         if (err) { return next(err); }
         // Redirect if it fails
         if (!user) { return res.redirect('/login'); }

        req.session.userName=user;
        return res.redirect('/nsecomm/home');
         //res.redirect('/nsecomm/home');
     })
    (req, res);
});


module.exports = router;