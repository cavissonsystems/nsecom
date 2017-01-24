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
    try {
        Account.register(new Account({username: req.body.username}), req.body.password, function (err, account) {
            if (err) {
                return res.render('signup', {account: account});
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/login');
            });
        });
    }
    catch(e){console.log(e)}
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
    function validateUserInfo() {
        try {
            var milliseconds = 3500;
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                    break;
                }
            }
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                // Redirect if it fails
                if (!user) {
                    return res.redirect('/login');
                }

                req.session.userName = user;
                return res.redirect('/nsecomm/home');
                //res.redirect('/nsecomm/home');
            })
            (req, res);
        }catch(e){console.log(e)}
    }
    validateUserInfo();
});


module.exports = router;