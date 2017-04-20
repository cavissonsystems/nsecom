/**
 * Created by Sahil on 3/20/17.
 */

var router = require('express').Router();
var Mem = require('memcached')

var mem = new Mem()
var profile = {
    'name':'cavisson',
    'city':'noida',
    'field':'Performance testing'
}

function connectToMemcacheDB(req,res){
        mem.set('cav',profile,1000,function(err){
            if(err){} ;
        })

    mem.get('cav', function(err,data){
        console.log(data)
        if(data)
        mem.get('cav')
        mem.del('cav', function () {
            //if(err) {}//throw new err;

            sendResp(req,res)
        });
    });
    //mem.get('cav')
    //mem.del('cav', function (err) {
    //    if(err) throw new err;
    //});
    //sendResp(req,res)
}
function sendResp(req,res){
    res.render('mongodb',{DB:'memcache'})
}

router.get('/',function(req,res){
    connectToMemcacheDB(req,res)
})
module.exports=router;