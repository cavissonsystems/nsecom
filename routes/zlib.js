
var express = require('express');
var router = express.Router();

const zlib = require('zlib');
var gzip ;
const fs = require('fs');
const path = require('path')


function zcompresslib(res){

try {
    var file = path.resolve(path.join(__dirname,'input.txt'))
    var outfile = path.resolve(path.join(__dirname,'input.txt.gz'))
    const inp = fs.createReadStream(file);
    const out = fs.createWriteStream(outfile);
    gzip = zlib.createGzip();
    inp.pipe(gzip).pipe(out);
    respond()
    inp.unpipe(gzip).unpipe(out)

    }catch(e){}

    function respond(){
        res.render('mongodb', {DB: 'Zlib !'});
    }

}

/* GET users listing. */
var zlibb = router.get('/', function(req, res, next) {

    zcompresslib(res)
});

module.exports = zlibb;
