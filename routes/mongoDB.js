/**
 * Created by Sahil on 6/8/16.
 */


var express = require ('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

var http = require('http');
var f2 = false;
var f3 = false;

function makeMongoddbConnection(req, res)
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

            f2 = true;
            if( f2 ==true && f3 ==true)
                mongodbCalloutResp();

        });
    }


    http.request(options, callback).on('error', function (err)
    {
        console.log(err)
    }).end();


    var mongo_url = "mongodb://sahildhall:Sahil123@ds023694.mlab.com:23694/nsecom-mongo";

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
           /*collection.insert([user1], function (err, result) {
               if (err) {
                   console.log(err);
               } else {
                   console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
               }
               //Close connection
             /!*  db.close();
               f2 = true;
               if(f1 ==true && f2 ==true)
                   respForCallout();*!/
           });*/

           // Find some users

           collection.find({name : 'Sahil'}).toArray(function(err,result)
           {
               if(err)console.log(err);
               else if(result.length)console.log("Result : ",result);
               else console.log("No data found");
               db.close();
               f3 = true;
               if( f2 ==true && f3 ==true)
                   mongodbCalloutResp();
           });
       }
    });




    function mongodbCalloutResp() {
        res.render('mongodb', {DB: 'Mongodb !'});
        f2 = false;
        f3 = false;
    };
}

/* GET home page. */
router.get('/', function(req, res, next)
{

    makeMongoddbConnection(req, res);
});

module.exports = router;