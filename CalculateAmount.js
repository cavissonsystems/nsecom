/**
 * Created by bala on 4/7/15.
 */
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var CalculateAmount = express();
//var mysql =  require('mysql');
var pg = require('pg');
var http = require('http');
var string = require('string');
var connection ;
var client;
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

   /*var conString = "pg://postgres:sidd@localhost:5432/test";

    client = new pg.Client(conString);
    client.connect();*/
    console.log("Connected");

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

CalculateAmount.executeDBQuery = function executeDBQuery(query){
    queryString = URLDecoder.decode(query);
    //System.out.println("query string = " + queryString);
    if (query.startsWith("insert") || query.startsWith("update")) {
        connection.query(query, function (err, result) {
            if (err) throw err;
            console.log('Result: ', result);

        })
    }
    else
    if (query.startsWith("select")) {
        connection.query(query, function (err, result) {
            if (err) throw err;
            console.log('Result: ', result);
        })
    }
    else {
        connection.query(query);
    }
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




