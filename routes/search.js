var router = require('express').Router();
var http = require('http');
var redis = require('redis');
var mongoose = require('mongoose');

var path = require('path')
var fs = require('fs')
var host,
    port,
    redisUri;
var propertyFile = (path.join(path.resolve(__dirname),'/../nsecom.properties'));
var data = fs.readFileSync(propertyFile).toString();
if(data){
    var nsecomAdd =  data.split('\n');
    redisUri = nsecomAdd[1]
    var address = nsecomAdd[0].split('|');
    host = address[1];
    port = address[2];
    uri = address[3]
}
try {
    var client = redis.createClient(redisUri);
}catch(e){console.log("Cant connect to redis, url is not correct")}

var products = {};

function searchProduct(req,res, keyword, prodid, upc, image, price, description,UserName)
{
    try {
        var options = {
            host: host,
            port: port,
            path: '/nsecom/searchProduct?keyword='+keyword
        };

        callback = function (resp) {
            var data = "";
            resp.on('data', function (chunk) {
                data += chunk;
            });
            resp.on('end', function () {
                try {
                    console.log("Getting data from java server & setting data in DB");
                    client.set([keyword, data]);
                    client.expire(keyword, 5);           //For 1 second
                    if(data.trim()==="")
                        data="{}";
                    products = JSON.parse(data);
                    res.render('search', {"products": products, "uname": UserName});
                    /*products.forEach(function(data){
                     client.set([data.prodId , data])
                     });*/
                }
                catch(err){
                    console.log(err)
                    return res.redirect('/nsecomm/home');
                    }
            });
        };
        mongoose.model('Blob').create({keyword:products},function(err,blob){
            if(err)console.log(err);
        });
        var httpReq = http.request(options,callback).on('error', function(err){
            console.log(err);});
        httpReq.end();


    }
    catch(err)
    {
        console.log("Error in making manyTier connection : "+err);
    }

};



router.get('/',function(req,res,next)
{
    try {
        searchProductInRedis(req,res);
    }
    catch(e){console.log(e)}
});

function searchProductInRedis(req,res){
    var keyword, prodid, upc, image, price, description;
    var UserName = "Guest User"
    keyword = req.query.keyword;
    prodid = req.query.prodid;
    upc = req.query.upc;
    image = req.query.image;
    price = req.query.price;
    description = req.query.description;
    var callJBOSS = false;
    if(req.session.userName)
        UserName = req.session.userName.username;
    client.get(keyword, function (err, data){
        try {
            if (data) {
                console.log("Getting dAta from redis server");
                products = JSON.parse(data);
                res.render('search', {"products": products, "uname": UserName});
            }
            else {
                callJBOSS = true;
            }
        }
        catch(e){console.log(e)}
    });
    var args = arguments;
    var interval = setInterval(function(){
        if(callJBOSS) {
            clearInterval(interval)
            searchProduct(args[0],args[1], keyword, prodid, upc, image, price, description,UserName);
        }

    },1)
}

function renderResp(req,res,product){
    res.render('search', {"products" : product});
}

module.exports = router;
