/**
 * Created by Sahil on 7/8/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var fs = require('fs')
var path = require('path')
var PGUSER,
    PGHOST,
    PGPORT,
    DATABASE ;
var propertyFile = (path.join(path.resolve(__dirname),'/../nsecom.properties'));
var data = fs.readFileSync(propertyFile).toString();
if(data){
    var nsecomAdd =  data.split('\n');
    var address = nsecomAdd[2].split('|');
    PGUSER = address[0];
    PGHOST = address[1];
    PGPORT = address[2];
    DATABASE = address[3]
}
// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present

/*var config = {
    user: 'dqlwzcsbobhcci', //env var: PGUSER
    database: 'd935m16il25m65', //env var: PGDATABASE
    password: 'Lcm2mB5bUamVHB6FiiYWw1Jdkc', //env var: PGPASSWORD
    host : 'ec2-54-221-253-117.compute-1.amazonaws.com',
    port: 5432, //env var: PGPORT
    max: 20, // max number of clients in the pool
    idleTimeoutMillis: 600000, // how long a client is allowed to remain idle before being closed
};*/

var config = {
    user: PGUSER, // name of the user account
    database: DATABASE, // name of the database
    host : PGHOST,
    port: PGPORT, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

var pool = new pg.Pool(config)
//pg.defaults.ssl = true ;
/*pool.connect(function (err, client,done) {

    if (err)
        return console.log("Not connected with pgdb",err);

})*/


//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
/*var pool ;
try {
     pool = new pg.Pool(config);
}
catch(err){}*/


/*
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
       // console.log("Error in connecting with PG: "+err)

    }

}
*/

//console.log("Initialized pool")


function makePostgresConnection(req, res)
{
    try {

        /*var client = new pg.Client(PGUSER+'://'+PGHOST+':'+PGPORT+'/'+DATABASE);
         client.connect();

         console.log("Connected");
         client.query(
         'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)')
            .on('end', function () { /!*client.end();*!/
         });

         var query = client.query("SELECT * from items;");
         query.on("row", function (row, result) {
         console.log("22222222222222")
         result.addRow(row);
         });
         query.on("end", function (result) {

         //done();
         //client.end();
         console.log(JSON.stringify(result.rows, null, " ") + "\n");
         });
         query.on('error', function (error) {

         console.log("Error in pg ", error);
         });
         var query = client.query('DROP TABLE items');
         query.on('end', function () {
         client.end()
         //pgCalloutResp();
         });*/

        //var PgUrl = "postgres://dqlwzcsbobhcci:Lcm2mB5bUamVHB6FiiYWw1Jdkc@ec2-54-221-253-117.compute-1.amazonaws.com:5432/d935m16il25m65";

        //pg.defaults.ssl = true ;
        pool.connect(function (err, client,done) {
            if (err)
                return console.log("Not connected with pgdb");

           /* client.query('DROP TABLE cavisson',function(err){
                if(err){}*/
            /*client.query('CREATE TABLE cavisson(id int,name varchar(40))',function(err,result) {
                if(err){}
                client.query("INSERT INTO cavisson VALUES(236,'Sahil')",function(err){
                    if(err){}
                    client.query('DROP TABLE cavisson',function(err,result){
                        if(err){}
                        done();
                        pgCalloutResp(res);
                    })
                })
            })*/

            client.query('CREATE TABLE cavisson(id int,name varchar(40))')
                .on('error',function(){})
            client.query('INSERT INTO cavisson VALUES(236,"Sahil")')
                .on('error',function(){})
            client.query('SELECT * FROM cavisson')
                .on('error',function(){})
            /*.on('row', function (data) {
             console.log('1111',JSON.stringify(data));
             })
             .on('err', function (err) {
             console.log(err);
             })*/
            client.query('DROP TABLE cavisson')
                .on('error',function(){})
                .on('end',function(){
                    done();
                    pgCalloutResp(res);
                });

            //})
           /* client.query("INSERT INTO cavisson VALUES(236,'Sahil')",function(err,data){
                if(err){}
            })
            client.query('SELECT * FROM cavisson')
            .on('row', function (data) {
             console.log('1111',JSON.stringify(data));
             })
             .on('err', function (err) {
             //console.log(err);
             })*/

        });
    }
    catch(err) {
        console.log("Error in connecting with PG: "+err)
        pgCalloutResp(res);
    }
}
function pgCalloutResp(res)
{
    res.render('mongodb',{DB: 'PosetGreSQL !'}) ;
}


router.get('/', function (req,res) {
    try {
        makePostgresConnection(req, res)
    } catch(err) {
        pgCalloutResp(res);
    }


});

module.exports = router;
