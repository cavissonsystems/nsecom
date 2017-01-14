/**
 * Created by netstorm on 1/13/17.
 */
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User = new mongoose.Schema({
    username: String,
    password: String
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);