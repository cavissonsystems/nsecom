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
var tierCalls=[];
var propertyFile = (path.join(path.resolve(__dirname),'/../nsecom.properties'));

var properties = fs.readFileSync(propertyFile).toString().split("\n");

for(var i=0; i < properties.length ; i++) {

    var values = properties[i].split("=");
    if(values[0].toUpperCase() == 'TIERCALLOUT'){
        var callouts = values[1] && values[1].split(':')
        for(var j in callouts){
            var val = callouts[j] && callouts[j].split('|')
            val[0] && val[1] && val[2] && tierCalls.push({host: val[0] , port: val[1] ,path: val[2]})
        }
        break;
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
                //sendRespMultiInstance();
            });
        };

        for(var i in tierCalls){
            http.request(tierCalls[i], callback).on('error', function (err) {
                console.log(err);
            }).end();
        }
        setTimeout(function(){sendRespMultiInstance()},2000)
        //http.request(options2,callback2).on('error',function(err){console.log(err);}).end();
    }
    catch(err)
    {
        console.log("Error in making manyTier connection : "+err);
    }

    function sendRespMultiInstance()
    {
        res.render('multiCallOut', { title: 'Called all callouts' });
        f1 = false;
        f2 = false;
        f3 = false;
    };
};



router.get('/',function(req,res,next)
{
    mtierCallOut(req,res);
});

module.exports = router;