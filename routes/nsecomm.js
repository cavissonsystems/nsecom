/**
 * Created by bala on 2/7/15.
 */

var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

        res.render('nsecomm', { title: 'nsecomm' });
    //console.trace("Trace of application");
});

module.exports = router;
