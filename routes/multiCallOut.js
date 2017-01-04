/**
 * Created by Sahil on 6/3/16.
 */

var router = require('express').Router();
var http = require('http');
var fs = require('fs');
var path = require('path');
var f1 = false;
var f2 = false;
var f3 = false;
var file_map = new Object();

function readPropertiesFile(file)
{

    var properties = fs.readFileSync(file).toString().split("\n");

    for(var i=0; i < properties.length ; i++)
    {
        var values = properties[i].split("|");

        for(var j=0; j < values.length ; j++) {

            var file_values = new Object();
            var key = values[0];
            file_values.host = values[1];
            file_values.port = values[2];
            file_values.path = values[3];
        }
        file_map[key] = file_values;
    }
}

function mtierCallOut(req,res)
{
    try {

        var options = file_map['1'];
        var options1 = file_map['2'];
        /*var options =
         {host: '127.0.0.1',
         port: '3001',
         path: '/nsecomm/manyTier'};

         var options1 = { host: '127.0.0.1',
         port: '3002',
         path: '/nsecomm/manyTier_yahoo'};*/

        //var options2 = file_map['3'];

        callback = function (res) {
            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                console.log("Node_1 is called");
                sendRespMultiInstance();
                /* f1 = true;
                 if(f1 == true && f2 == true ) {

                 }*/
            });
        };

        callback1 = function (res) {
            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                console.log(data);
                console.log("Node_2 is called ");

                f2 = true;
                if (f1 == true && f2 == true) {
                    sendRespMultiInstance();
                }

            });
        };


        /* callback2 = function(res)
         {
         var data = "";
         res.on('data',function(chunk)
         {
         data += chunk ;
         });
         res.on('end',function()
         {
         console.log(data);
         console.log("Java Agent is called ");

         f3 = true;
         if(f1 == true && f2 == true && f3 == true) {
         sendRespMultiInstance();
         }

         });
         };*/

        http.request(options, callback).on('error', function (err) {
            console.log(err);
        }).end();
        http.request(options1, callback1).on('error', function (err) {
            console.log(err);
        }).end();
        //http.request(options2,callback2).on('error',function(err){console.log(err);}).end();
    }
    catch(err)
    {
        console.log("Error in making manyTier connection : "+err);
    }

    function sendRespMultiInstance()
    {
        res.render('multiCallOut', { title: 'Both Instances been called' });
        f1 = false;
        f2 = false;
        f3 = false;
    };
};



router.get('/',function(req,res,next)
{
    readPropertiesFile(path.join(path.resolve(__dirname),'/../nsecom.properties'));
    mtierCallOut(req,res);
});

module.exports = router;