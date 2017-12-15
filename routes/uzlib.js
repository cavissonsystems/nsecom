
var express = require('express');
var router = express.Router();

const zlib = require('zlib');
const unzip = zlib.createUnzip();
const fs = require('fs');

function unzlibb(res){

    try {
        var file = path.resolve(path.join(__dirname,'input.txt.gz'))
        var outfile = path.resolve(path.join(__dirname,'decompressed.txt'))
        const inp = fs.createReadStream(file);
        const out = fs.createWriteStream(outfile);

        inp.pipe(unzip).pipe(out);

        respond()
        inp.unpipe(unzip).unpipe(out);
    }catch(e){

    }

    function respond(){
        res.render('mongodb', {DB: 'UNzlib !'});
    }

}



var un_zlib = router.get('/', function(req, res, next) {

    unzlibb(res);
});

module.exports = un_zlib;