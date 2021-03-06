/**
 * Created by bala on 3/7/15.
 */
var router = require('express').Router();
var calculateAmount = require('../CalculateAmount');
var placeOrder = require('../PlaceOrder');
var updateCheckOut = require('../UpdateCheckOut');
var checkExecutionTimeForMethods = require('../CheckExecutionTimeForMethods');
var http = require('http');

function availabilityCheck(req, res) {
try{
 //  x();
}catch(err){
console.log("custom error has called");
}

    setTimeout(function() {
    }, 13000);
    checkStoreInventory();
}

function x(){
throw new Error("Custom Error");
}


function checkStoreInventory(){}


function productInfo() {
    setTimeout(function() {
    }, 2000);
}
function checkout(req, res, sleepTime, sleepTimeForValidate, level, isManyMethodsCall) {
    try {

        setTimeout(function () {
        }, 13000);
        // log.info("checkOut() sleep time for cc =" + sleepTimeForCC + "sleep time for validate = " + sleepTimeForValidate + " level = " + level);
        if (level >= 1) productInfo();
        if (level >= 2) availabilityCheck();
        if (level >= 3)
            calculateAmount.calculateAmt();
        if (level >= 4)
            calculateAmount.chargeCreditCard(sleepTime, sleepTimeForValidate);
        if (level >= 5) {
            //calculateAmount.makeConnection();
            //calculateAmount.connectToCCAuthCenter();
        }
        if (level >= 6) {
            placeOrder.fullfillOrder();
            updateCheckOut.updateCheckOutStats();
        }
        if (isManyMethodsCall.toLowerCase() == "yes") {

            var options = {
                host: 'www.yahoo.com',
                headers : {
                    'Connection' : 'keep-alive'
                }
            };

            callback = function (response) {
                //var str = '';

                //response.on('data', function (chunk) {
                //    str += chunk;
                //});

                response.on('end', function () {

                });
            }

            checkExecutionTimeForMethods.calTimeFor_M1();
            checkExecutionTimeForMethods.calTimeFor_M2();
            checkExecutionTimeForMethods.calTimeFor_M3();
            checkExecutionTimeForMethods.calTimeFor_M4();
            checkExecutionTimeForMethods.calTimeFor_M5();
            checkExecutionTimeForMethods.calTimeFor_M6();
            checkExecutionTimeForMethods.calTimeFor_M7();
            checkExecutionTimeForMethods.calTimeFor_M8();
            checkExecutionTimeForMethods.calTimeFor_M9();
            checkExecutionTimeForMethods.calTimeFor_M10();
            checkExecutionTimeForMethods.calTimeFor_M11();
            checkExecutionTimeForMethods.calTimeFor_M12();
            checkExecutionTimeForMethods.calTimeFor_M13();
            checkExecutionTimeForMethods.calTimeFor_M14();
            checkExecutionTimeForMethods.calTimeFor_M15();
            checkExecutionTimeForMethods.calTimeFor_M16();
            checkExecutionTimeForMethods.calTimeFor_M17();
            checkExecutionTimeForMethods.calTimeFor_M18();
            checkExecutionTimeForMethods.calTimeFor_M19();
            checkExecutionTimeForMethods.calTimeFor_M20();
            checkExecutionTimeForMethods.calTimeFor_M21();
            checkExecutionTimeForMethods.calTimeFor_M22();
            checkExecutionTimeForMethods.calTimeFor_M23();
            checkExecutionTimeForMethods.calTimeFor_M24();
            checkExecutionTimeForMethods.calTimeFor_M25();
            checkExecutionTimeForMethods.calTimeFor_M26();
            checkExecutionTimeForMethods.calTimeFor_M27();
            checkExecutionTimeForMethods.calTimeFor_M28();
            checkExecutionTimeForMethods.calTimeFor_M29();
            checkExecutionTimeForMethods.calTimeFor_M30();
            checkExecutionTimeForMethods.calTimeFor_M31();
            checkExecutionTimeForMethods.calTimeFor_M32();
            checkExecutionTimeForMethods.calTimeFor_M33();
            checkExecutionTimeForMethods.calTimeFor_M34();
            checkExecutionTimeForMethods.calTimeFor_M35();
            checkExecutionTimeForMethods.calTimeFor_M36();
            checkExecutionTimeForMethods.calTimeFor_M37();
            checkExecutionTimeForMethods.calTimeFor_M38();
            checkExecutionTimeForMethods.calTimeFor_M39();
            checkExecutionTimeForMethods.calTimeFor_M40();
            checkExecutionTimeForMethods.calTimeFor_M41();
            checkExecutionTimeForMethods.calTimeFor_M42();
            checkExecutionTimeForMethods.calTimeFor_M43();
            checkExecutionTimeForMethods.calTimeFor_M44();
            checkExecutionTimeForMethods.calTimeFor_M45();
            checkExecutionTimeForMethods.calTimeFor_M46();
            checkExecutionTimeForMethods.calTimeFor_M47();
            checkExecutionTimeForMethods.calTimeFor_M48();
            checkExecutionTimeForMethods.calTimeFor_M49();
            checkExecutionTimeForMethods.calTimeFor_M50();
        }
    }
    catch(err)
    {
        console.log("Error in checkout : "+err);
    }
}


function exeDBQuery(query){
    try {
        calculateAmount.makeConnection();
        calculateAmount.executeDBQuery(query);
    }
    catch(err)
    {
        console.log("Error in exeDBQuery : "+err);
    }

}


function dbOperation(operation, productID, productName, column, uvalue, wcolumn, wvalue, quantity, price){
    try {
        query = null;
        if (operation == "insert") {
            if (productID != null && productName != null && quantity != 0 && price != 0) {
                var query = "INSERT INTO purchaseorder VALUES ('" + productID + "','" + productName + "'," + quantity + "," + price + ")";
                calculateAmount.makeConnection();
                calculateAmount.executeDBQueryChange(query);
            }
        } else if (operation == "select") {
            if (column != null) {
                if (column == "all") {
                    query = "SELECT * from purchaseorder";
                } else {
                    query = "SELECT" + " " + column + " from purchaseorder";
                }
                calculateAmount.makeConnection();
                calculateAmount.executeDBQueryChange(query);


            }
        } else if (operation == "update") {
            if (column != null && uvalue != null && wcolumn != null && wvalue != null) {
                query = "UPDATE purchaseorder ";
                if (column == "price" || column == "quantity") {
                    var updateValue = parseInt(uvalue);
                    query = query + "SET " + column + "=" + updateValue;
                } else {
                    query = query + "SET " + column + "='" + uvalue + "'";
                }
                if (wcolumn == "price" || wcolumn == "quantity") {
                    var whereValue = parseInt(wvalue);
                    query = query + " where " + wcolumn + "=" + whereValue;
                } else {
                    query = query + " where " + wcolumn + "='" + wvalue + "'";
                }
                calculateAmount.makeConnection();
                calculateAmount.executeDBQueryChange(query);
            }
        } else if (operation == "delete") {
            query = "DELETE FROM purchaseorder WHERE ";
            if (wcolumn != null && wvalue != null || column != null) {
                if (wcolumn != null && wvalue != null) {
                    if (wcolumn == "price" || wcolumn == "quantity") {
                        var whereValue = parseInt(wvalue);
                        query = query + wcolumn + "=" + whereValue;
                    } else {
                        query = query + wcolumn + "='" + wvalue + "'";
                    }
                }
                if (column != null) {
                    query = "TRUNCATE purchaseorder";
                }
                calculateAmount.makeConnection();
                calculateAmount.executeDBQueryChange(query);
            }
        }
    }
    catch(err)
    {
        console.log("Error in dbOperation : "+err);
    }

}
/* GET users listing. */
    router.get('/', function(req, res, next) {
    var operation, stfcc, stfv, productID, productName, column, uvalue, wcolumn, wvalue, query, logSeverity, logMessage, isManyMethodsCall;
    var db = req.db;
    var sleepTime = req.query.sleepTimeForCC;
    var sleepTimeForValidate = req.query.sleepTimeForValidate;
    var level = req.query.level;

    operation = req.query.operation;
    stfcc = req.query.sleepTimeForCC;
    stfv = req.query.sleepTimeForValidate;
    level = req.query.level;
    productID = req.query.prodID;
    productName = req.query.prodName;
    column = req.query.column;
    var qty = req.query.quantity;
    var prc = req.query.price;
    uvalue = req.query.uvalue;
    wcolumn = req.query.wcolumn;
    wvalue = req.query.wvalue;
    query = req.query.query;
    logSeverity = req.query.log;
    logMessage = req.query.msg;
    var lc = req.query.count;
    isManyMethodsCall = req.query.manymethods;

    if(isManyMethodsCall == undefined)
        isManyMethodsCall = 'no';

    if(lc != undefined)
        logcount = parseInt(lc);

    if(logMessage == undefined)
        logMessage = 'log message is undefined, please define log message';

    if(qty != undefined)
        quantity = parseInt(qty);

    if(prc != undefined)
        price = parseInt(prc);
    if(stfcc != undefined){
        sleepTimeForCC = parseInt(stfcc);
    }
    if(stfv != undefined){
        sleepTimeForValidate = parseInt(stfv);
    }
    if(level != null){
        level = parseInt(level);
    }
    if(logSeverity != undefined){
        if(level == undefined)
            level = 1;
        //PrintLog.print(logSeverity, logMessage, logCount);

    }

    checkout(req, res, sleepTime, sleepTimeForValidate, level, isManyMethodsCall);

    //console.log('sleep time = ' + sleepTime + ' sleep time for validation =' + sleepTimeForValidate + 'level = ' + level);
    if(operation != null)
        dbOperation(operation, productID, productName, column, uvalue, wcolumn, wvalue, quantity, price ,query);
    if(query != null)
    {
        exeDBQuery(query)
    }
    //if(blevel != level)
    //  System.out.println("level value is diffrent blevel = " + blevel + " level value = " + level);

    //var collection = db.get('usercollection');

  res.render('checkout', {"stfcc" : stfcc, "stfv" : sleepTimeForValidate, "level" : level});

    /* collection.find({},{},function(e,docs){
     res.render('check', {
     "userlist" : docs
     });
     });*/
});

module.exports = router;
