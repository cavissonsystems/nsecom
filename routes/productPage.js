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
        port = address[2]
        uri = address[3]
}
var products = {};

function productInfo(req,res, prodid,upc,image, price)
{
    try {
        var options = {
            host: host,
            port: port,
            path : '/nsecom/productPage?productid='+prodid+'&upc='+upc+'&prodImage='+image+'&prodPrice='+price
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
function productData() {
    console.log("productData has called");
    setTimeout(function() {
    }, 2000);
}

router.get('/',function(req,res,next)
{
    var prodid, upc, image, price;
    prodid = req.query.productid;
    upc = req.query.upc;
    image = req.query.prodImage;
    price = req.query.prodPrice;
    productData();
    productInfo(req,res, prodid,upc, image, price)
});

module.exports = router;
