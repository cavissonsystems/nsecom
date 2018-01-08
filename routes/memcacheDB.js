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

function connectToMemcacheDB(request,response){
    mem.set('cav',profile,10000,function(err){
        if(err){} ;
    })

    mem.get('cav', function(err,data){
        if(data)
        mem.del('cav', function () {
            //if(err) {}//throw new err;

            //sendResp(request,response)
        });
    });
    //mem.get('cav')
    //mem.del('cav', function (err) {
    //    if(err) throw new err;
    //});
    sendResp(request,response)
    function sendResp(request,response){
        response.render('mongodb',{DB:'memcache'})
    }
}

router.get('/',function(request,response){
    connectToMemcacheDB(request,response)
})
module.exports=router;