/**
 * Created by bala on 4/7/15.
 */
var mongoClient = require('mongodb').MongoClient;
var express = require('express');
var CalculateAmount = express();
//var mysql =  require('mysql');
var pg = require('pg');
var http = require('http');
var string = require('string');
var connection ;
var client ;
//database
var mongo = require('mongodb');

//var monk = require('monk');


CalculateAmount.calculateAmt = function calculateAmount() {
    console.log('calculate amount occured');
    setTimeout(function() {
    }, 10000);
};
CalculateAmount.waiting = function (n){
    for (var i=0; i<= 1000000000; i++){
        n=i+1;
    }
    return n;
}
CalculateAmount.exception = function (a){
    try {
        a = this.a / 0;
        return a;
    }
    catch(e){return e;}
}

CalculateAmount.chargeCreditCard = function chargeCreditCard(sleepTimeForCC, sleepTimeForValidate){
    setTimeout(function() {
    }, 12000);
    validateCreditCard(sleepTimeForCC, sleepTimeForValidate);
};

function validateCreditCard(sleepTimeForCC, sleepTimeForValidate){
    console.log("validateCreditCard has called");

    setTimeout(function() {
    }, sleepTimeForCC);
    validate(sleepTimeForValidate);
}

function validate(stime){
    console.log("validat has called");
    setTimeout(function(){
    }, stime);
}

CalculateAmount.makeConnection = function makeConnection()
{
    try {
        var URL = "postgres://dqlwzcsbobhcci:Lcm2mB5bUamVHB6FiiYWw1Jdkc@ec2-54-221-253-117.compute-1.amazonaws.com:5432/d935m16il25m65";
        pg.defaults.ssl = true;

        client = new pg.Client(URL);
        client.connect();

        console.log("Connected");
    }
    catch(err){console.log(err)}

}

CalculateAmount.executeDBQueryChange = function executeDBQueryChange(query) {
    console.log("executeDBQueryChange has called");
    console.log(query);
    //console.log(client);
    try {
        if (query.indexOf("INSERT") > -1 || query.indexOf("UPDATE") > -1) {
                client.query(query, function (err, result) {
                    if (err) throw err;
                    console.log('Result: ', result);

                })
        }
        else
        if (query.indexOf("SELECT") > -1) {
            console.log(query);
            client.query(query, function (err, result) {
                if (err) throw err;
                console.log('Result: ', result);
            })
        }
        else {
            client.query(query);
        }
    }
    catch (err) {
        console.log(err)
    }
}

CalculateAmount.executeDBQuery = function executeDBQuery(command){
    try {

        var query = client.query(command);

        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            console.log(JSON.stringify(result.rows, null, " ") + "\n");
            client.end();
        });
        query.on('error', function (error) {
            console.log(error);
        });
    }
    catch(err){console.log(err)}


}

CalculateAmount.connectToCCAuthCenter = function connectToCCAuthCenter()
{
    var db = monk('localhost:27017/untitled1');

    var collection = db.get('usercollection');

    collection.insert(
        { "username" : 'testuser1', "email" : "testuser1@testdomain.com" }
    );

    collection.remove({"username" : "testuser1"});

    db.close();
};

module.exports = CalculateAmount;




