var express = require('express');
var router = express.Router();
var zookeeper = require('node-zookeeper-client');
var connected = false

try {
    var client = zookeeper.createClient('localhost:2181');
}
catch(err){console.log(" cant create client of zoo - ",err)}
client.connect()
	client.once('connected', function () {
//            listChildren(client, path,res);
        });

function makeZookeperConnection (req,res)
{
    try {
        if(!client) {
            console.log("Not connected to Zoo.");
            return
        }
        var path = "/root/hk";//process.argv[2];

        function listChildren(client, path,res) {
            client.getChildren(
                path,
                function (event) {
                    listChildren(client, path);
                },
                function (error, children, stat) {
                    if (error) {
                        return;
                    }
                }
            );
		sendZookeperResponse(res);
        }
listChildren(client,path,res)
    }
    catch(err)
    {
        console.log("Error in connecting with Zoo : "+err);
    }

    function sendZookeperResponse (res)
    {
        res.render('mongodb', {DB: 'Zookeeper Client !'});
    }

}

router.get('/',function(req,res)
{
    makeZookeperConnection(req,res);
});


module.exports=router;

