/**
 * Created by Siddhant on 03-01-2017.
 */

var router = require('express').Router();
var http = require('http');

var path = require('path')
var fs = require('fs')
var host,
    port;
var propertyFile = (path.join(path.resolve(__dirname),'/../nsecom.properties'));
var calculateAmount = require('../CalculateAmount');
var placeOrder = require('../PlaceOrder');
var updateCheckOut = require('../UpdateCheckOut');
var data = fs.readFileSync(propertyFile).toString();
if(data){
    var nsecomAdd =  data.split('\n')[0];
    var address = nsecomAdd.split('|');
    host = address[1];
    port = address[2];
    uri = address[3]
}

var products = [];
var delay = (path.join(path.resolve(__dirname),'/../delay.txt'));

function preProcessReq(dataToProcess){
    var start = new Date().getTime();
    for (var i in 1e7) {
        console.log();
        if ((new Date().getTime() - start) > dataToProcess){
            return ;
        }
    }
}

function checkOut(req,res, prodid,upc, price,size,quantity,color,status,cartId,name,address,city,PostalCode,country,card,cvv,month,year)
{
    try {
        var options = {
            host : host,
            port : port,
            path : '/nsecom/checkOut?name='+name+'&address='+address+'&city='+city+'&PostalCode='+PostalCode+'&country='+country+'&card='+card+'&cvv='+cvv+'&month='+month+'&Year='+year+'&productid='+prodid+'&upc='+upc+'&size='+size+'&color='+color+'&quantity='+quantity+'&price='+price+'&status='+status+'&cartId='+cartId
        };

        var callback = function (response) {
            var data = "";
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                res.send(data);
            });
        };
        var dataToProcess = fs.readFileSync(delay).toString();
	    preProcessReq(dataToProcess);

        var req = http.request(options,callback).on('error', function(err){
            console.log(err);});
        req.end();

    }
    catch(err)
    {
        console.log("Error in making manyTier connection : "+err);
    }

};



router.get('/',function(req,res,next)
{
    var name,address,city,PostalCode,country,prodid, upc, price, size, quantity,color,status,cartId,card,cvv,month,year;
    name = req.query.name;
    address = req.query.address;
    city = req.query.city;
    PostalCode = req.query.PostalCode;
    country = req.query.country;
    prodid = req.query.productid;
    upc = req.query.upc;
    price = req.query.price;
    size = req.query.size;
    quantity = req.query.quantity;
    color = req.query.color;
    status = req.query.status;
    cartId = req.query.cartId;
    card = req.query.card;
    cvv = req.query.cvv;
    month = req.query.month;
    year = req.query.Year;
    //card=s&cvv=s&month=02&Year=2016
    calculateAmount.calculateAmt();
    calculateAmount.chargeCreditCard(5, 40);
    placeOrder.fullfillOrder();
    updateCheckOut.updateCheckOutStats();
    checkOut(req,res, prodid,upc, price, size, quantity,color,status,cartId, name,address,city,PostalCode,country,card,cvv,month,year);
    /*setTimeout(function(){
     res.render('search', {"products" : products});},5000);*/
});

module.exports = router;
