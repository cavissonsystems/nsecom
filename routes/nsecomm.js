/**
 * Created by bala on 2/7/15.
 */

var express = require('express');
var router = express.Router();


/* GET users listing. */
var g = router.get('/', function(req, res, next) {

        res.render('nsecomm', { title: 'nsecomm' });
});

module.exports = g;
