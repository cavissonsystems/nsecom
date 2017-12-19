var express = require('express');
var router = express.Router();
var dgram = require('dgram');

function udpprogram(res){

    var server = dgram.createSocket('udp4');

    server.on('error',function(err){
        server.close();
    })
    server.on('message', function(msg, rinfo)  {
        console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    });

    server.on('listening', function()  {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });
    server.bind(41234);

    respond()
    function respond(){
        res.render('mongodb', {DB: 'UDP !'});
    }

}
var _udp = router.get('/', function(req, res, next) {

    udpprogram(res);
});

module.exports = _udp;