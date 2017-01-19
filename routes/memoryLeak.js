/**
 * Created by Sahil on 1/17/17.
 */
var router = require('express').Router();
var leaks = [];

function LeakingClass(){}

function makeLeak(req,res) {

    for (var i = 0; i < 10000; i++) {
        leaks.push(new LeakingClass);
    }
    console.log(leaks.length);

    console.error('Leaks: %d', leaks.length);
    console.error('Total: %d  Used: %d  RSS: %d', process.memoryUsage().heapTotal,process.memoryUsage().heapUsed,process.memoryUsage().rss);
    res.render('mongodb',{DB:"Memory Leakage"})
}

router.get('/',function(req,res){
    makeLeak(req,res)
});

module.exports = router;