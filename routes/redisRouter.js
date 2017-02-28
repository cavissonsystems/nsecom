/**
 * Created by sahil on 8/2/16.
 */

var express = require('express');
var redisRouter = express.Router();
var redis = require('redis');

// var client = redis.createClient('//redis-17593.c8.us-east-1-3.ec2.cloud.redislabs.com:17593', {no_ready_check: true});
try {
    var client = redis.createClient('//localhost:6379', {no_ready_check: true});
}
catch(err){console.log(err)}
function createRedisConnection (req,res)
{
    try {


       /* client.auth('Sahil@123', function (err) {
            if (err)  throw err;
        });*/

        client.on('connect', function (err) {
            if (err) throw  err;
            console.log('connected');
        });

        client.on('error', function (err) {

            console.log('error is- '+err);
        });


        client.set('sahil', 'dhall')/*,function(err,rply)
         {
         if(err)
         console.log(err)

         console.log(rply.toString());
         })*/
	    //client.quit();

        client.get('sahil', function (err, rply) {
            if (err)
                console.log("error in redis get call : " + err);

                console.log("reply is : " + rply);
                client.hmset(['framework', 'angular', 'bootstrap', 'express', 'node']/*, function (err,rply) {
                 console.log(rply.toString())
                 }*/);
                //client.quit();
                client.hgetall('framework', function (err, data) {
                    redisCallout(res);
                })
        });
    }
    catch(err)
    {
        console.log("Error in connecting with redis : "+err);
    }

    function redisCallout (res)
    {
        res.render('mongodb', {DB: 'Redis !'});
    }

}

redisRouter.get('/',function(req,res)
{
    createRedisConnection(req,res);
});


module.exports=redisRouter;
