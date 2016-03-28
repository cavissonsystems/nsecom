/**
 * Created by Siddhant on 06-07-2015.
 */

var express = require('express');
var UpdateCheckOut = express();
//database
var mongo = require('mongodb');
var monk = require('monk');


UpdateCheckOut.updateCheckOutStats = function updateCheckOutStats() {
    console.log("updateCheckOutStats has called");
    setTimeout(function() {
    }, 10000);
};

module.exports = UpdateCheckOut;