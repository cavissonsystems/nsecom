var express = require('express');
var router = express.Router();

const crypto = require('crypto');


function cryptofile(res){

    const secret = 'abcdefg';
    var hash = crypto.createHmac('sha256', secret)
        .update('I love cupcakes')
        .digest('hex');

    respond()

    function respond() {
        res.render('mongodb', {DB: 'Crypto .\nCipher data is : '+hash.toString() });
    }
}

var cryp = router.get('/', function(req, res, next) {

    cryptofile(res)

});

module.exports = cryp;
