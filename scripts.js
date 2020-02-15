function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator === 'add') {
        return add(a, b);
    }
    if (operator === 'subtract') {
        return subtract(a, b);
    }
    if (operator === 'multiply') {
        return multiply(a, b);
    }
    if (operator === 'divide') {
        return divide(a, b);
    }
}
let numStr = '';
let num, runningTotal, answer;
let numArray = [];
let opArray = [];
let addSubArray = [], opArrayAddSub = [];
let opIndex, multIndex, divIndex;
let screen = document.getElementById('calc-screen');

let digits = document.querySelectorAll('.digit');
digits.forEach(element => element.addEventListener('click', typeDigits));

let operators = document.querySelectorAll('.operator');
operators.forEach(element => element.addEventListener('click', operatorClick));

let clear = document.getElementById('clear');
clear.addEventListener('click', clearCalc);

let equals = document.getElementById('equals');
equals.addEventListener('click', runEquals);


function typeDigits() {
    screen.textContent += this.id;
    numStr += this.id;
    //console.log(numStr);
}

function operatorClick() {
    storeNum();
    opArray.push(this.id);
    console.table(opArray);
    screen.textContent += ' ' + this.dataset.print + ' ';
}

function runEquals() {
    storeNum();
    let multDivResult;
    // Clear multiplication and division first
    while (opArray.includes('multiply') || opArray.includes('divide')) {
        multIndex = opArray.indexOf('multiply');
        //console.log("Mult Index: " + multIndex);
        divIndex = opArray.indexOf('divide');
        //console.log("Div index: " + divIndex);

        if (multIndex > -1) {
            if (multIndex < divIndex || divIndex === -1) {
                let product = operate(opArray[multIndex], numArray[multIndex], numArray[multIndex + 1]);
                console.log(product);
                numArray[multIndex + 1] = product;
                multDivResult = product;
                numArray.splice(multIndex, 1);
                opArray.splice(multIndex, 1);

            } 
        }

        if (divIndex > -1) {
            if (divIndex < multIndex || multIndex === -1) {
                let quotient = operate(opArray[divIndex], numArray[divIndex], numArray[divIndex + 1]);
                console.log(quotient);
                numArray[divIndex + 1] = quotient;
                multDivResult = quotient;
                numArray.splice(divIndex, 1);
                opArray.splice(divIndex, 1);
            }
        }

    }
    // perform addition and subtraction if needed. Otherwise return final product/quotient
    if (opArray.includes('add') || opArray.includes('subtract')){
        opArray.forEach(function(element){
            let i = 0;
            opIndex = opArray.indexOf(element);
            console.log(opIndex);
            if (element === 'add'|| element == 'subtract') {
                if (opIndex === 0) {
                runningTotal = operate(element, numArray[opIndex], numArray[opIndex + 1]);
                } 
                else {
                runningTotal = operate(element, runningTotal, numArray[opIndex + 1]);
                console.log(runningTotal);
                }
                opArray[opIndex] = 'cleared' + i;
                i++
            
            }
        });
    } else {
        runningTotal = multDivResult;
    }
    console.log(runningTotal);
    screen.textContent = runningTotal;
    return runningTotal;

    
}

function storeNum() {
    num = parseInt(numStr, 10);
    // May need to add check for NaN -- don't push to array if NaN
    console.log(num);
    numArray.push(num);
    console.table(numArray);
    numStr = '';
}

function clearCalc() {
    numStr = '';
    numArray = [];
    opArray = [];
    screen.textContent = '';
}