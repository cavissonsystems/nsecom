var mongoose = require('mongoose');
var Mem = require('memcached')

var mem = new Mem()
mem.connect('127.0.0.1:11211',function(err,con){
    if(err){
        //console.log(con)
    }
})
try {
    var monoDblink = 'mongodb://localhost/nsecomDb';
   /* var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };*/

    var options={ server : {reconnectTries: Number.MAX_VALUE,poolSize: 10,socketOptions: { keepAlive: 10000, connectTimeoutMS: 30000 }}}

    mongoose.connect(monoDblink,options);



    var con = mongoose.connection;
    con.on('error',function(err){
        console.log("Unable to Connect to Mongod Server \n Please start mongoDB ...")
    });
}
catch(e)
{
    console.log("Cant able to connect with mongodb : ",e)
}
