/**
 * Created by compass241 on 19-10-2015.
 */

var express = require('express');
var router = express.Router();
var http = require('http');
var pg = require('pg');

//var connection= require('cassandra-client').Connection;

var f1 = false;
var f2 = false;
//var f3 = false;

function availabilityCheck(req, res) {
    console.log("availabilityCheck has called");
    var options = {
        host: 'www.gmail.com'};

    var options1 = {
        host : 'www.google.com'
    };

    callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function() {
            console.log("Gmail call has ended");
            f1 = true;
            if(f1 == true && f2 == true  )
            {
                sendResp();
            }
            //http.request(options1, callback1).end();

        });
    }

    callback1 = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function() {
            //res.render('checkout');
            console.log("Google call has ended");
            f2 = true;
            if(f1 == true && f2 == true ) {
                sendResp();
            }
            //res.render('checkout');
            //http.request(options1, callback1).end();

        });
    }

    http.request(options, callback).end();
    http.request(options1, callback1).end();

    //*****************CASSANDRA*************

   /* var con = new connection({host : '127.0.0.1', port :'9042' ,keyspace : 'cavisson'});
    console.log("going to connect");
    con.connect(function(err,data)
    {
        if (err) {
            // Failed to establish connection.
            throw err;
            console.log("Failed to establish connection");
        }

        con.execute('SELECT * FROM test ;', function(err,data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
    });*/

    /*function doSimpleConnect(callback) {
        // these are the connection parameters you need to connect to Cassandra.
        var connectionOptions = {
            host: '127.0.0.1',
            port: 9042,
            keyspace: 'cavisson',
            use_bigints: false
        };

        var con = new Connection(connectionOptions);
        con.connect();
        console.log('connected successfully');
*/

   /* var Connection = require('cassandra-client').PooledConnection;


    var cassandra = new Connection({'hosts': '127.0.0.1', 'port':'9042' , 'keyspace': 'cavisson'});
    cassandra.on('log', function(level, message, obj) {
        console.log('log event: %s -- %j', level, message);
    });
    var cql = "SELECT * FROM test ;";

    cassandra.execute(cql, function(err, rows) {
        if(err) console.log("erreur à la requete");
        else
        console.log(rows);
        cassandra.shutdown(function() {
            console.log("connectoin pool shutdown");
        });
    })
        *//*con.connect(function(err) {
            // if err != null, something bad happened.
            // else, assume all is good.  your connection is ready to use.
            if (!err) {
                // close the connection and return to caller.
                console.log("no error");
                con.close(callback);
                console.log("hiiiiiiiiiiii");
            } else {
                // no need to close, just return to caller.
                console.log(" error");
                callback(err);
                console.log("helo");
            }
        });
    }*/

   /* var client = new cassandra.Client({contactPoints : ['127.0.0.1:9042'], keyspace : 'cavisson'});
    client.connect(function (err,data) {
    console.log("connected with cassandra");
    });
    var query = client.execute('SELECT * FROM test ;',function (err,data) {
        if (!err)
            console.log(data);
        else
            console.log(err);
    });
*/

    //*****************PostGrese*************

   /* var conString = "pg://postgres:sidd@localhost:5432/test";

    client = new pg.Client(conString);
    client.connect();
    console.log("Connected");
    var query = client.query("INSERT INTO purchaseorder values('001','Jeans',10,100)", function (err, result) {
        if (err) throw err;
        console.log('Result: ', result);
        });

    query.on('end', function() {
        client.end();
        f3 = true;
        if(f1 == true && f2 == true && f3 == true) {
            sendResp();
        }
    });*/

function sendResp(){
        res.render('checkout');
     f1 = false;
     f2 = false;
    // f3 = false;

    /*else{
        sendResp();
    }*/
};


}

router.get('/', function(req, res, next){
    availabilityCheck(req, res);
});

//req.render('checkout');

module.exports = router;