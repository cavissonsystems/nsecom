var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({
    keyword:[{}]
});
mongoose.model('Blob', blobSchema);