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
var data = fs.readFileSync(propertyFile).toString();
if(data){
    var nsecomAdd =  data.split('\n')[0];
    var address = nsecomAdd.split('|');
    host = address[1];
    port = address[2];
    uri = address[3]
}

var products = [];

function userAddress(req,res, prodid,upc,image, price,size,quantity,color,status,cartId)
{
    try {

        var options = {
            host: host,
            port: port,
            path : '/nsecom/shippingAddress?productid='+prodid+'&upc='+upc+'&size='+size+'&color='+color+'&quantity='+quantity+'&price='+price+'&status='+status+'&cartId='+cartId
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
    var prodid, upc, image, price, size, quantity,color,status,cartId;
    prodid = req.query.productid;
    upc = req.query.upc;
    image = req.query.prodImage;
    price = req.query.price;
    size = req.query.size;
    quantity = req.query.quantity;
    color = req.query.color;
    status = req.query.status;
    cartId = req.query.cartId;
    userAddress(req,res, prodid,upc, image, price, size, quantity,color,status,cartId);
    /*setTimeout(function(){
     res.render('search', {"products" : products});},5000);*/
});

module.exports = router;