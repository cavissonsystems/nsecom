/**
 * Created by Siddhant on 03-01-2017.
 */

var router = require('express').Router();
var http = require('http');


var products = [];

function prodProcess(req,res, prodid,upc,image, price,size,quantity,color,status,cartId)
{
    console.log("In prodProcess");
    try {

        var options = {
            host : '10.10.40.11',
            port : '7001',
            path : '/nsecom/shippingAddress?productid='+prodid+'&upc='+upc+'&size='+size+'&color='+color+'&quantity='+quantity+'&price='+price+'&status='+status+'&cartId='+cartId
        };

        var callback = function (response) {
            var data = "";
            response.on('data', function (chunk) {
                data += chunk;
                console.log(data);
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
    prodProcess(req,res, prodid,upc, image, price, size, quantity,color,status,cartId);
    /*setTimeout(function(){
     res.render('search', {"products" : products});},5000);*/
});

module.exports = router;