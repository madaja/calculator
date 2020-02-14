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
    if (operator === '+') {
        return add(a, b);
    }
    if (operator === '-') {
        return subtract(a, b);
    }
    if (operator === '*') {
        return multiply(a, b);
    }
    if (operator === '/') {
        return divide(a, b);
    }
}
let numStr = '';
let num;
let numArray = [];
let opArray = [];
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