/**
 * Created by Siddhant on 07-07-2015.
 */

var http = require("http");
var express = require('express');
var router = express.Router();

var options = {
    hostname: 'localhost',
    port: 8080,
    path: '/CustomerDB/webresources/entities.customer/1/12',
    method: 'GET',
    headers: {
        'Accept' : 'application/json'
    }
};


/* GET users listing. */
router.get('/', function(req, res, next) {

    var req1 = http.request(options, function(res1) {
        res1.setEncoding('utf8');

        res1.on('data', function (chunk) {
            res.render('server', {"data" : chunk});


        });
    });

    req1.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

// write data to request body
//req.write(postData);
    req1.end();


});


module.exports = router;