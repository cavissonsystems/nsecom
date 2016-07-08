/**
 * Created by Siddhant on 06-07-2015.
 */

var express = require('express');
var PlaceOrder = express();
//database
//var mongo = require('mongodb');
//var monk = require('monk');


PlaceOrder.fullfillOrder = function fullfillOrder() {
    console.log("fullfillOrder has called");
    sendOrderToFullfillmentCenter();
    sendEmailConfirmation();
};
 function sendOrderToFullfillmentCenter() {
     console.log("sendOrderToFullfillmentCenter has called");
    setTimeout(function() {
    }, 12000);
};
function sendEmailConfirmation() {
    setTimeout(function() {
    }, 11000);
};

module.exports = PlaceOrder;




