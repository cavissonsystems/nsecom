var express = require('express');
var router = express.Router();

const dns = require('dns');
var i = 0;

function resolvedns(res){
    var list = ['google.com','hackerrank.com','cavisson.com','tutorialspoint.com','nodejs.org','javatpoint.com','qatech.co.in']
    var add='',fami=''
    dns.lookup(list[i], function(err, address, family)  {
        add=JSON.stringify(address)
        respond(add)
    });
    ++i;
    if(i>6){
        i=0;
    }

    function respond(){
        res.render('mongodb', {DB: 'dns lookup for '+ list[i]+' address : '+ add });
    }
}


var _dns = router.get('/', function(req, res, next) {
    resolvedns(res)
});

module.exports = _dns;