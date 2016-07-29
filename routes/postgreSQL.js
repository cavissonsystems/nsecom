/**
 * Created by Sahil on 7/8/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
function makePostgresConnection(req, res)
{
    try {
        var URL = "postgres://dqlwzcsbobhcci:Lcm2mB5bUamVHB6FiiYWw1Jdkc@ec2-54-221-253-117.compute-1.amazonaws.com:5432/d935m16il25m65";
        pg.defaults.ssl = true;

        var client = new pg.Client(URL);
        client.connect();

        console.log("Connected");

        var query = client.query("SELECT * FROM emp");
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {

            client.end();
            console.log(JSON.stringify(result.rows, null, " ") + "\n");

            pgCalloutResp();
        });
        query.on('error', function (error) {
            console.log(error);
        });
    }
    catch(err) {console.log(err);}

//22222222222222222222222222222
    /*pg.connect(URL,function(err,client)
     {
     if(err) throw err;

     console.log("Connected successfully to : "+URL);

     client
     .query('SELECT * FROM emp;')
     .on('row',function(data)
     {
     console.log(JSON.stringify(data));
     })
     .on('end',function()
     {
     client.end();
     pgCalloutResp();
     })
     .on('err', function (err) {
     console.log(err);
     })
     });*/
    function pgCalloutResp()
    {
        res.render('mongodb',{DB: 'PosetGreSQL !'}) ;
    }
}



router.get('/', function (req,res) {
    makePostgresConnection(req,res)
});

module.exports = router;