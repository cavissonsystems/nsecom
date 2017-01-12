/**
 * Created by Sahil on 7/8/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present

var config = {
    user: 'dqlwzcsbobhcci', //env var: PGUSER
    database: 'd935m16il25m65', //env var: PGDATABASE
    password: 'Lcm2mB5bUamVHB6FiiYWw1Jdkc', //env var: PGPASSWORD
    host : 'ec2-54-221-253-117.compute-1.amazonaws.com',
    port: 5432, //env var: PGPORT
    max: 20, // max number of clients in the pool
    idleTimeoutMillis: 600000, // how long a client is allowed to remain idle before being closed
};



//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool ;
try {
//     pool = new pg.Pool(config);
}
catch(err){}


for(var i=0;i<=10;i++){


    try {
        pg.defaults.ssl = true ;
        pool.connect(function (err, client,done) {

            if (err)
                return console.log("Not connected with pgdb");

            //console.log("Connected successfully to pgdb ");

            client
                .query('SELECT * FROM emp;')
                .on('row', function (data) {
                   // console.log(JSON.stringify(data));
                })
                .on('end', function () {
                    done();

                })
                .on('err', function (err) {
                    console.log(err);
                })
        });
    }
    catch(err)
    {
        console.log("Error in connecting with PG: "+err)
    }

}

console.log("Initialized pool")


function makePostgresConnection(req, res)
{
/*
    try {
        var client = new pg.Client(URL);
        client.connect();

        console.log("Connected");

        var query = client.query("SELECT * FROM emp");
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {

            //done();
            client.end();
            console.log(JSON.stringify(result.rows, null, " ") + "\n");

            pgCalloutResp();
        });
        query.on('error', function (error) {
            console.log(error);
        });
    }
    catch(err) {console.log(err);}
*/
//22222222222222222222222222222

    //var PgUrl = "postgres://dqlwzcsbobhcci:Lcm2mB5bUamVHB6FiiYWw1Jdkc@ec2-54-221-253-117.compute-1.amazonaws.com:5432/d935m16il25m65";

    try {
        pg.defaults.ssl = true ;
        pool.connect(function (err, client,done) {

            if (err)
                return console.log("Not connected with pgdb");

            console.log("Connected successfully to pgdb ");

            client
                .query('SELECT * FROM emp;')
                .on('row', function (data) {
                    console.log(JSON.stringify(data));
                })
                .on('end', function () {
                    done();
                    pgCalloutResp();
                })
                .on('err', function (err) {
                    console.log(err);
                })
        });
    }
    catch(err)
    {
        console.log("Error in connecting with PG: "+err)
    }
    function pgCalloutResp()
    {
        res.render('mongodb',{DB: 'PosetGreSQL !'}) ;
    }
}



router.get('/', function (req,res) {
    makePostgresConnection(req,res)
});

module.exports = router;
