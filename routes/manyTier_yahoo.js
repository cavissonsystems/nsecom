/**
 * Created by Sahil on 6/8/16.
 */


var express = require ('express');
var router = express.Router();

var http = require('http');

function availabilityCheck(req, res)
{
    var options = {
        host: 'www.yahoo.com'
    };

    callback = function (response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            console.log("Yahoo call has ended");

            respForCallout();

        });
    }


    http.request(options, callback).on('error', function (err)
    {
        console.log(err)
    }).end();

    function respForCallout() {
        res.render('manyTier_yahoo', {title: 'Successfully called to Yahoo.com .'});
    };
}

/* GET home page. */
router.get('/', function(req, res, next)
{

    availabilityCheck(req, res);
});

module.exports = router;