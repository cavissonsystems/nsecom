/**
 * Created by Sahil on 1/17/17.
 */
var router = require('express').Router();
var checkExecutionTimeForMethods = require('../CheckExecutionTimeForMethods');
var items = [];

function checkItemInInventory(req,res) {
    try {
        itemList();

        for (var i = 0; i < 1000000; i++) {
            items.push(new Date().getTime());
        }

        console.error('Leaks: %d', items.length);
        console.error('Total: %d  Used: %d  RSS: %d', process.memoryUsage().heapTotal, process.memoryUsage().heapUsed, process.memoryUsage().rss);
        res.render('mongodb', {DB: "Memory Leakage"})
    }
    catch(e){console.log(e)}
}

function itemList(){

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

router.get('/',function(req,res){
    checkItemInInventory(req,res)
});

module.exports = router;