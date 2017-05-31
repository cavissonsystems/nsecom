var express = require('express');
var router = express.Router();
var zookeeper = require('node-zookeeper-client');

//=================================================================================================================

try {
    var client = zookeeper.createClient('localhost:2181');
}
catch(err){console.log(" cant create client of zoo - ",err)}
function createRedisConnection (req,res)
{
    try {
        if(!client) {
            console.log("Not connected to Zoo.");
            return
        }
        var path = "/root/hk";//process.argv[2];

/*        client.once('connected', function () {
            console.log('Connected to the server.');

            client.create(path, function (error) {
                if (error) {
                    console.log('Failed to create node: %s due to: %s.', path, error);
                } else {
                    console.log('Node: %s is successfully created.', path);
                }

                client.close();
            });
        });

        client.connect();*/

        function listChildren(client, path) {
            client.getChildren(
                path,
                function (event) {
                    console.log('Got watcher event: %s', event);
                    listChildren(client, path);
                },
                function (error, children, stat) {
                    if (error) {
                        console.log(
                            'Failed to list children of %s due to: %s.',
                            path,
                            error
                        );
                        return;
                    }

                    console.log('Children of %s are: %j.', path, children);
                }
            );
        }

        client.once('connected', function () {
            console.log('Connected to ZooKeeper.');
            listChildren(client, path);
        });

        client.connect();

        redisCallout(res);


    }
    catch(err)
    {
        console.log("Error in connecting with Zoo : "+err);
    }

    function redisCallout (res)
    {
        res.render('mongodb', {DB: 'Zookeeper Client !'});
    }

}

router.get('/',function(req,res)
{
    createRedisConnection(req,res);
});


module.exports=router;

//==========================================================================================================================================================




/*
try {
    var client = zookeeper.createClient('10.1.677nnnn.10.10:6370');
    //var client = redis.createClient('//localhost:6379', {no_ready_check: true});
    var path = '/root';

}
catch(err){console.log(err)}
function createRedisConnection1 (req,res)
{
  console.log("Hi21.1");
    try {

       /!* client.auth('Sahil@123', function (err) {
            if (err)  throw err;
        });*!/
        if(!client) {
            console.log("Not connected to Zookeeper.");
            return
         }

try{

/!*client.create(
    '/root',
    new Buffer('data'),
    CreateMode.EPHEMERAL,
    function (error, path) {
        if (error) {
            console.log(error.stack);
            return;
        }

        console.log('Node: %s is created.', path);
    }
);*!/
}
catch(er){
 console.log("Eroor is create -: "+er);
}
          try{
//var path = '/root';

client.once('connected', function () {
    try {
        console.log('Connected to the server.');

        client.create(path, function (error) {
            if (error) {
                console.log('Failed to create node: %s due to: %s.', path, error);
            } else {
                console.log('Node: %s is successfully created.', path);
            }

            client.close();
        });
    }
    catch(err){console.log(" Error in once fn ",err);}
    });

client.connect();
}
catch(er){
 console.log("Eroor is -1: "+er);
}
try{

function listChildren(client, path) {
    client.getChildren(
        path,
        function (event) {
            console.log('Got watcher event: %s', event);
            listChildren(client, path);
        },
        function (error, children, stat) {
            if (error) {
                console.log(
                    'Failed to list children of %s due to: %s.',
                    path,
                    error
                );
                return;
            }

            console.log('Children of %s are: %j.', path, children);
        }
    );
}

client.once('connected', function () {
    console.log('Connected to ZooKeeper.');
    listChildren(client, path);
});

client.connect();
}
catch(er){
 console.log("Eroor is 3 -: "+er);
}
try{
client.getChildren('/root', function (error, children, stats) {
    if (error) {
        console.log(error.stack);
        return;
    }

    console.log('Children are: %j.', children);
});
}
catch(er){
 console.log("Eroor is -2: "+er);
}
                    redisCallout(res);
    }
    catch(err)
    {
        console.log("Error in connecting with zookeeper : "+err);
    }

    function redisCallout (res)
    {
        res.render('mongodb', {DB: 'Zookeeper !'});
    }

}
router.get('/',function(req,res)
{
    console.log("------------------------------------");
      createRedisConnection1(req,res);
});

module.exports = router;
*/
