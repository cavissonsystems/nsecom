/**
 * Created by Sahil on 6/8/16.
 */


var express = require ('express');
var router = express.Router();
//var MongoClient = require('mongodb').MongoClient;

var mongoose = require('mongoose');//mongo connection,


var http = require('http');
var f2 = false;
var f3 = false;
var db;
// Initialize connection once
/*try {
   // MongoClient.connect("mongodb://sahildhall:Sahil123@ds023694.mlab.com:23694/nsecom-mongo", function (err, database) {
        if (err)
            return;

        db = database;
    });
}
catch(err)
{
    console.log(err)
}*/


function makeMongoddbConnection(req, res)
{
    try {
  //          if (!db) return ;

            /*var collection = db.collection('cavisson');

            //Create some users
            var user1 = {name: 'Sahil', age: 22, id: 'CS10236'};

            collection.find({name: 'Sahil'}).toArray(function (err, result) {
                if (err) {
                    return console.log(err);
                }

                if (result.length) {
                  //  console.log("Result : ", result);
                }
                else {
                    collection.insert([user1], function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                        }
                    });
            }
                //db.close();
                mongodbCalloutResp();
          });*/
        mongoose.model('EmployeSchema').create({
            name : 'sahil',
            age : 45
        }, function (err, blob) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                //Blob has been created
                //console.log('POST creating new blob: ' + blob);
		try{
                mongoose.model('EmployeSchema').findById(blob.id,function(err,blob)
                {
                    if(err)
                    {
                        res.send("There was a problem adding the information to the database.");
                    }
                    if(blob)
                    {
                        try {
                            mongoose.model('EmployeSchema').remove(blob, function (err) {
                                if (err)
                                    res.send("There was a problem adding the information to the database.");

                                //          console.log("deleted successfully : ",blob)
                                mongodbCalloutResp();
                            })
                        }
                        catch(e){console.log(e)}
                    }
                })
		}
		catch(e){console.log(e)}
            }
        })
    }
    catch(err){
        console.log("Error in connecting with mongodb : "+err);
    }

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
