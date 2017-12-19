var express = require('express');
var router = express.Router();

const dns = require('dns');
var i=0
function resolveReverseDns(res){
    var hostname=''
    var list = ['216.58.197.78','52.5.22.205','64.151.192.11','64.185.181.238']
    dns.reverse(list[i],function(err,value){
        if(err){console.log(err)}
        hostname=value
        respond()
    })
    ++i
    if(i>3){
        i=0
    }
    function respond(){
        res.render('mongodb', {DB: 'Reverse DNS ip :'+list[i]+ ' : '+hostname});
    }
}


var rev_dns = router.get('/', function(req, res, next) {
    resolveReverseDns(res)
});

module.exports = rev_dns;