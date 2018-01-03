/**
 * Created by sandeep on 4/6/17.
 */

var express = require('express')
var app = express(),
    path = require('path')
var iorouter = express.Router()
var http = require('http')
var server = http.Server(app);
var io = require('socket.io').listen(server);
var cluster =  require('cluster')
var i=0
if(cluster.isMaster)
        server.listen('5000')
else{
        i = ++i
        var port = (5000+i)
        server.listen(port)
}
server.listen('5000');

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
})


io.on('connection',function(socket){
    socket.on('disconnect',function(){
    })
    socket.close()
})

function makeSocketioConnection(req,res) {
    res.redirect('http://localhost:5000')
}
function ioCalloutResp(res) {
    res.render('mongodb', {DB: 'SocketIO !'});
}

/ GET home page. /
iorouter.get('/',function(req, res) {
    makeSocketioConnection(req, res);
});
module.exports = iorouter
