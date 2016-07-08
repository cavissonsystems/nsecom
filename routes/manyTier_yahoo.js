/**
 * Created by Sahil on 6/8/16.
 */


var express = require ('express');
var router = express.Router();
var pg = require('pg');
var mongoClient = require('mongodb').MongoClient;

var http = require('http');
var f1 = false;
var f2 = false;

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

            f1 = true;
            if(f1 ==true && f2 ==true)
                respForCallout();

        });
    }


    http.request(options, callback).on('error', function (err)
    {
        console.log(err)
    }).end();

    var URL = "postgres://dqlwzcsbobhcci:Lcm2mB5bUamVHB6FiiYWw1Jdkc@ec2-54-221-253-117.compute-1.amazonaws.com:5432/d935m16il25m65";
    pg.defaults.ssl = true;

    //22222222222222222222222222222
    /*pg.connect(URL,function(err,client)
     {
     if(err) throw err;

     console.log("Connected successfully to : "+URL);

     client
     .query('SELECT * FROM emp;')
     .on('row',function(data)
     {
     console.log(JSON.stringify(data));
     })
     .on('end',function()
     {
     client.end();
     respForCallout();
     })
     .on('err', function (err) {
     console.log(err);
     })
     });*/

    var client = new pg.Client(URL);
    client.connect();

    console.log("Connected");

    var query = client.query("SELECT * FROM emp;");
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        client.end();
        console.log(JSON.stringify(result.rows, null, " ") + "\n");
        f2 = true;
        if(f1 ==true && f2 ==true)
            respForCallout();
    });
    query.on('err', function (err) {
        console.log(err);
    });
    //333333333333333333333333333333333

    /*var mongo_url = "mongodb://sahildhall:Sahil123@ds023694.mlab.com:23694/nsecom-mongo";

     mongoClient.connect(mongo_url, function (err, db)
     {
     if(err)
     console.log(err);
     else
     {
     console.log("Successfully connected : "+mongo_url);
     var collection = db.collection('cavisson');

     //Create some users
     var user1 = {name: 'Sahil', age: 22, id : 'CS10236'};

     // Insert some users
     /!* collection.insert([user1], function (err, result) {
     if (err) {
     console.log(err);
     } else {
     console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
     }
     //Close connection
     db.close();
     f2 = true;
     if(f1 ==true && f2 ==true)
     respForCallout();
     });*!/

     // Find some users

     collection.find({name : 'Sahil'}).toArray(function(err,result)
     {
     if(err)console.log(err);
     else if(result.length)console.log("Result : ",result);
     else console.log("No data found");
     db.close();
     f2 = true;
     if(f1 ==true && f2 ==true)
     respForCallout();
     });
     }
     });*/




    function respForCallout() {
        res.render('manyTier_yahoo', {title: 'Hi'});
        f1 = false;
        f2 = false;
    };
}

/* GET home page. */
router.get('/', function(req, res, next)
{

    availabilityCheck(req, res);
});

module.exports = router;