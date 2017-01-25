var mongoose = require('mongoose');
try {
    var monoDblink = 'mongodb://localhost/nsecomDb';
   /* var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };*/

    var options={ server : {reconnectTries: Number.MAX_VALUE,poolSize: 10,socketOptions: { keepAlive: 10000, connectTimeoutMS: 30000 }}}

    mongoose.connect(monoDblink,options);



    var con = mongoose.connection;
    con.on('error',function(err){
        console.log("Error in db.js ",err.stack)
    });
}
catch(e)
{
    console.log("Cant able to connect with mongodb : ",e)
}
