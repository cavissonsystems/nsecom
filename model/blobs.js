/**
 * Created by Sahil on 1/12/17.
 */

var mongoose = require('mongoose');
var blobSchema = new mongoose.Schema({
    keyword:[{}]
});

mongoose.model('Blob', blobSchema);