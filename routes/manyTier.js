/**
 * Created by Sahil on 19-10-2015.
 */

var express = require('express');
var router = express.Router();
var http = require('http');
var pg = require('pg');

//var connection= require('cassandra-client').Connection;

var f1 = false;
var f2 = false;
//var f3 = false;

function x(){
    throw new Error("Custom Error");
}

function multiHttpConnection(req, res) {
    try {
        var options = {
            host: 'www.gmail.com'
        };

        var callback = function (response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                    sendResp();
            });
        };

        var options1 = {
            host: 'www.google.coma',
            headers : {
                'Connection' : 'keep-alive'
            }
        };
        callback1 = function (response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                sendResp();

            });
        };
        // x();
        http.request(options, callback).on('error',function(err){console.log(err)}).end();
        //sendResp();
    }
    catch(err)
    {
        console.log("error in making http calls : "+err)
        sendResp();
    }



    function sendResp(){
        res.render('checkout');
    };

}

router.get('/', function(req, res, next){
    multiHttpConnection(req, res);
});


module.exports = router;
