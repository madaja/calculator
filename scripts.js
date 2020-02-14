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
let num, runningTotal;
let numArray = [];
let opArray = [];
let opIndex;
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
    let i = 0;
    opArray.forEach(function(element){
        
        opIndex = opArray.indexOf(element);
        console.log(opIndex);
        if (element === 'multiply'|| element == 'divide') {
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
    /* opArray.forEach(function(element){
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
    }); */
    console.log(runningTotal);
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