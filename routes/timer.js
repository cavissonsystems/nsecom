
var express = require('express');
var router = express.Router();

function sampleTimer(res){
    setTimeout(function(){

        setTimeout(function(){

            respond()
        },1000)
    },500)

    function respond(){
        res.render('mongodb', {DB: 'Timer !'});
    }
}

/* GET users listing. */
var T = router.get('/', function(req, res, next) {
    sampleTimer(res)
});

module.exports = T;

