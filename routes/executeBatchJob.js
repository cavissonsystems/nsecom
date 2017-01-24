/**
 * Created by Sahil on 1/17/17.
 */
var router = require('express').Router();
var fs = require('fs');
var path = require('path')
var fileName = (path.join(path.resolve(__dirname),'/../package.json'))

function executeAllBatchJob(req,res) {

    preBatchJob();
    posBatchtJob();
    verifyBatchJob(req,res);
}
function preBatchJob(){
    console.log("Executing prejob");
    setTimeout(function() {
    }, 2000);
}
function posBatchtJob(){
    console.log("Executing postjob");
    setTimeout(function() {
    }, 2000);
}
function verifyBatchJob(){
    var start = new Date().getTime();
    for (var i = 0; i < 900000; i++) {
        fs.readFileSync(fileName).toString();
    }
    res.render('mongodb',{DB:"CPU Utilization"})
}

router.get('/',function(req,res){
    executeAllBatchJob(req,res)
});

module.exports = router;