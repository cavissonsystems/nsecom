/**
 * Created by Sahil on 1/17/17.
 */
var router = require('express').Router();
var fs = require('fs');
var path = require('path')
var fileName = (path.join(path.resolve(__dirname),'/../package.json'))
var leaks = [];

function LeakingClass(){}

function makeCpuUtilization(req,res) {

    for (var i = 0; i < 10000; i++) {
        fs.readFileSync(fileName).toString();
    }

    res.render('mongodb',{DB:"CPU Utilization"})
}

router.get('/',function(req,res){
    makeCpuUtilization(req,res)
});

module.exports = router;