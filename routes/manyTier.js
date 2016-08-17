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

function multiHttpConnection(req, res) {
    console.log("availabilityCheck has called");
    try {
        var options = {
            host: 'www.gmail.com'
        };

        /*callback = function (response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                console.log("Gmail call has ended");
                f1 = true;
                if (f1 == true && f2 == true) {
                    sendResp();
                }
                //http.request(options1, callback1).end();

            });
        }*/

        var options1 = {
            host: 'www.google.com',
            headers : {
                'Connection' : 'keep-alive'
            }
        };
        callback1 = function (response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
            //    str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {

                //console.log("Google call has ended");
                //     f2 = true;
                //   if(f1 == true && f2 == true ) {
                sendResp();
                // }

            });
        };

        //http.request(options, callback).on('error',function(err){console.log(err)}).end();
        http.request(options1, callback1).on('error', function (err) {
            console.log(err)
        }).end();
    }
    catch(err)
    {
        console.log("error in making http calls : "+err)
    }



function sendResp(){
        res.render('checkout');
};


}

router.get('/', function(req, res, next){
    multiHttpConnection(req, res);
});


module.exports = router;