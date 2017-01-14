/**
 * Created by Siddhant on 03-01-2017.
 */

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
var products = {};
var passport = require('passport');
function prodProcess(req,res, prodid,upc,image, price,size,quantity)
{
    try {

        var options = {
            host: host,
            port: port,
            path : '/nsecom/addToBag?size='+size+'&productid='+prodid+'&prodPrice='+price+'&upc='+upc+'&prodImage='+image+'&quantity='+quantity
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
    if(!req.session.userName)
        return res.redirect('/login')
    var prodid, upc, image, price, size, quantity;
    prodid = req.query.productid;
    upc = req.query.upc;
    image = req.query.prodImage;
    price = req.query.price;
    size = req.query.size;
    quantity = req.query.quantity;
    prodProcess(req,res, prodid,upc, image, price, size, quantity);
    /*setTimeout(function(){
     res.render('search', {"products" : products});},5000);*/
});

module.exports = router;
