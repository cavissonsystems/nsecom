/**
 * Created by Sahil on 1/12/17.
 */

var mongoose = require('mongoose');
var blobSchema = new mongoose.Schema({
    name:String,
    age:Number
});
mongoose.model('EmployeSchema', blobSchema);