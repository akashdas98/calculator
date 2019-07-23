const previous = document.querySelector('.previous');
const current = document.querySelector('.current');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const ac = document.querySelector('.ac');
const del = document.querySelector('.del');

let currentOperand = '';
let previousOperand = '';
let previousOperator = '';

function calculate(curr, prev, c) {
    let a = parseFloat(curr);
    let b = parseFloat(prev);
    if(c == '') return a;
    return c == '+'? b + a : c == '-'? b - a : c == '*'? b * a : b / a;
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        appendCurrent(number.textContent);
        updateScreen();
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        operate(operator.textContent);
        updateScreen();
    });
});

del.addEventListener('click', () => {
    Delete();
    updateScreen();
});

ac.addEventListener('click', () => {
    clear();
    updateScreen();
});

equals.addEventListener('click', () => {
    result();
    updateScreen();
});

function Delete() {
    if(currentOperand == '') {
        if(previousOperand == '') {
            return;
        }
        previousOperator = '';
        currentOperand = previousOperand;
        previousOperand = '';
        return;
    }
    currentOperand = currentOperand.slice(0, -1);
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    previousOperator = '';
}

function result() {
    if(currentOperand == '') return;
    let n = calculate(currentOperand, previousOperand, previousOperator)
    currentOperand = parseFloat(n.toFixed(10)).toString();
    previousOperand = '';
    previousOperator = '';
}

function updateScreen() {
    previous.textContent = previousOperand + ' ' + previousOperator;
    if(currentOperand.length > 16) {
        current.textContent = 'Error';
        currentOperand = '';
        return;
    }
    current.textContent = currentOperand;
}

function operate(operator) {
    if(currentOperand == '' || currentOperand == '-') {
        if(operator == '-') {
            currentOperand = operator;
            return;
        } return;
    }
    if(previousOperand != '') {
        let n = calculate(currentOperand, previousOperand, previousOperator)
        currentOperand = parseFloat(n.toFixed(10)).toString();
    }
    previousOperand = currentOperand;
    currentOperand = '';
    previousOperator = operator;
}

function appendCurrent(number) {
    if(number == '.' && currentOperand.includes('.')) return;
    if(currentOperand.length < 15)
        currentOperand += number;
}