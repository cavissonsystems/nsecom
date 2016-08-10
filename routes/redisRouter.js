/**
 * Created by sahil on 8/2/16.
 */

var express = require('express');
var redisRouter = express.Router();
var redis = require('redis');

function createRedisConnection (req,res)
{

    var client = redis.createClient('//redis-17593.c8.us-east-1-3.ec2.cloud.redislabs.com:17593', {no_ready_check: true});

    client.auth('Sahil@123', function (err) {
        if (err)  throw err;
    });

    client.on('connect', function(err) {
        if(err) throw  err;
        console.log('connected');
    });



    client.set('sahil','dhall'/*,function(err,rply)
    {
        if(err)
            console.log(err)

        console.log(rply.toString());
    }*/)

    client.get('sahil',function(err,rply)
    {
        if(err)
            console.log(err)

        console.log(rply);
        client.hmset(['framework','angular','bootstrap','express','node']/*, function (err,rply) {
            console.log(rply.toString())
        }*/);

        client.hgetall('framework', function (err,data) {
            console.log(data)
            redisCallout(res);
        })
    });

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