var mongoose = require('mongoose');
try {
    var monoDblink = 'mongodb://localhost/nsecomDb';

    mongoose.connect(monoDblink);
}
catch(e)
{
    console.log("Cant able to connect with mongodb : ",e)
}
