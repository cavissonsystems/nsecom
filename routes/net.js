/**
 * Created by netstorm on 4/6/17.
 */
var net = require('net')
var app = require('express')
var netrouter = app.Router()


function createNetConnection(req, res){
    var server = net.createServer(function(connection) {
        console.log('client connected');

        connection.on('end', function() {
            console.log('client disconnected');
            server.close();
        });
        connection.write('Hello World!\r\n');
    });
    server.listen(8080, function() {
        console.log('server is listening');
    });
    netCalloutResp(res)
}

function netCalloutResp(res) {
    res.render('mongodb', {DB: 'NET !'});

}
function createNetConnectionforClient(req,res)
{
    var client = net.connect({port: 8080}, function() {
        console.log('connected to server!');
    });
    client.on('data', function(data) {
        console.log(data.toString());
        client.end();
    });
    client.on('end', function() {
        console.log('disconnected from server');
    });
}
/ GET home page. /
netrouter.get('/', function(req, res)
{
    createNetConnection(req, res);
    createNetConnectionforClient(req,res)
});

module.exports = netrouter;