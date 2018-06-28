const router = require('express').Router();
var spreadArray = [1,39,10]
var generatorVal

class SwapTwoNo{

    constructor(a=1,b=2){
        this.a = a;
        this.b = b;
    }

    swap(){
        let temp = this.a;
        this.a = this.b;
        this.b = temp
        return this
    }
    getSwapedA(){
        return this.a;
    }
    getSwapedB(){
        return this.b;
    }
}

var supportEcmaScript = (res) => {
    var sumWithSpreadArray = (a,b,c=9)=> {

        return a+b+c;
    }
    var sum = sumWithSpreadArray(...spreadArray);

    var classSwap = new SwapTwoNo(5,50)
    // console.log(classSwap.swap().getSwapedA(),classSwap.swap().getSwapedB())
    function* iter () {
        for (var i = 0; i < 10; i++) yield i
    }
    for (var val of iter()) {
        generatorVal = [val] // outputs 0 — 9
    }

    respond()

    function respond() {

        res.render('mongodb', {DB: 'ECMAScript .\n'+'Sum Usinf SpreadOperator = '+sum+'; Swaped A='+classSwap.swap().getSwapedA()+'; Swaped B='+classSwap.getSwapedB()+' Value Genereted by generator :',generatorVal });
    }
}



var EcmaScript = router.get('/',function(req,res,next){

    supportEcmaScript(res);

})

module.exports = EcmaScript;
