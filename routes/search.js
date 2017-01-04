var router = require('express').Router();
var http = require('http');
var redis = require('redis');

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

function prodProcess(req,res, keyword, prodid, upc, image, price, description)
{
    try {
        var options = {
            host: host,
            port: port,
            path: '/nsecom/searchProduct?keyword='+keyword
        };

        callback = function (res) {
            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
		console.log("Getting data from java server & setting data in DB");
                client.set([keyword , data]);

                data.forEach(function(data)
                {
                    client.set([data.prodId , data])
                })

                products = JSON.parse(data);
		        res.render('search', {"products" : products});
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
    var keyword, prodid, upc, image, price, description;
    keyword = req.query.keyword;
    prodid = req.query.prodid;
    upc = req.query.upc;
    image = req.query.image;
    price = req.query.price;
    description = req.query.description;

    client.get(keyword,function(err,data){
        if(data) {
            console.log("Getting dAta from redis server",data);
            products = JSON.parse(data);
            res.render('search', {"products" : products});
        }
        else{
	 	prodProcess(req,res,keyword, prodid, upc, image, price, description);
        }
    })

});

module.exports = router;
