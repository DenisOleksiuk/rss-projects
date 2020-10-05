'use strict';

const parent = document.querySelector('.calculator-grid'),
      prev = document.querySelector('[data-previous-operand]'),
      current = document.querySelector('[data-current-operand]');

let operator = '';
let isAnswer = false;
let res = 0;

const equil = (x, y) => {
    switch (operator) {
        case "+":
            return x+y;
        case "-":
            return x-y;
        case "*":
            return x*y;
        case "÷":
            return x/y;
        case "^":
            return Math.pow(x, y)
    }
};

const fraction = (a, b, o) => {
    a = isNaN(a) || !isFinite(a) || a == '0' ? '0.0' : a.toString();
    b = isNaN(b) || !isFinite(b) || b == '0' ? '0.0' : b.toString();

    let decA = a.split('.')[1] || '';
    let decB = b.split('.')[1] || '';        
    
    switch (o) {
        case '+':
            return Number(Number((Number(a) + Number(b)).toFixed(decA.length + decB.length)).toString());                  
        case '-':
            return Number(Number((Number(a) - Number(b)).toFixed(decA.length + decB.length)).toString());
        case '*':
            return Number(Number((Number(a) * Number(b)).toFixed(decA.length + decB.length)).toString());
    }
}

parent.addEventListener('click', (e) => {
    if (e.target == parent) {
        return;
    }

    if (e.target.textContent == '.' && current.textContent.includes('.') || e.target.textContent === '+' && prev.textContent.includes('+') || e.target.textContent === '+/-' && current.textContent.includes('-')) {
        return;
    }

    if (Number(e.target.textContent) || e.target.textContent == '.' || e.target.textContent == '0') {
        if (isAnswer == true) {
            current.textContent = '';
            isAnswer = false;
        }
        current.textContent += e.target.textContent;
    }
    
    if (e.target.textContent == '+/-') {
        current.textContent = `-${current.textContent}`
    }
        
    switch (e.target.textContent) {
        case "AC":
            current.textContent = '';
            prev.textContent = '';
            break;
        case "DEL":
            current.textContent = current.textContent.slice(0, -1);
            break;
        case "√":
            if (isNaN(Math.sqrt(current.textContent)))  current.textContent = "Астанавись";
            else 
                current.textContent = Math.sqrt(current.textContent);

            console.log(Math.sqrt(current.textContent));
            isAnswer = true;
            break;
        case "^":
            operator = "^";
            if (prev.textContent !== '') {
                prev.textContent = equil(parseFloat(prev.textContent) || 0,  parseFloat(current.textContent))  + "^";
            } else {
                prev.textContent = +current.textContent + "^";
            }
            current.textContent = '';
            break;
        case "+":
            operator = "+";
            prev.textContent = equil(parseFloat(prev.textContent) || 0,  parseFloat(current.textContent)) + "+";
            if (prev.textContent.includes('NaN')) {
                prev.textContent = ''
            }
            current.textContent = '';
            break;
        case "-":
            operator = "-"
            prev.textContent = equil(parseFloat(current.textContent) || 0,  parseFloat(prev.textContent)||0) + "-";
            if (prev.textContent.includes('NaN')) {
                prev.textContent = ''
            }
            current.textContent = '';
            break;
        case "*":
            operator = "*";
            prev.textContent = equil(parseFloat(current.textContent), parseFloat(prev.textContent)|| 1) + "*";
            if (prev.textContent.includes('NaN')) {
                prev.textContent = ''
            }
            current.textContent = '';
            break;
        case "÷":
            operator = "÷"; 
            if (prev.textContent !== '') {
                prev.textContent = equil(parseFloat(prev.textContent) || 0,  parseFloat(current.textContent))  + "÷";
            } else {
                prev.textContent = current.textContent + "÷";
            }
            if (prev.textContent.includes('NaN')) {
                prev.textContent = '';
            }
            current.textContent = '';
            break;
        case "=":
            if (prev.textContent.includes('.') && current.textContent.includes('.')) {
                current.textContent = fraction(parseFloat(current.textContent), parseFloat(prev.textContent), operator);
            } else  {
                current.textContent = equil(parseFloat(prev.textContent), parseFloat(current.textContent));
            }
            if (current.textContent === 'NaN') {
                current.textContent = '';
            }
            prev.textContent = '';
            isAnswer = true;
            break;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === '.' && current.textContent.includes('.')) {
        return;
    }
    if (Number(e.key) || e.key === "0" || e.key === ".") {
        if (isAnswer == true) {
            current.textContent = ''
            isAnswer = false
        }
        current.textContent += e.key;
    }

    if (e.key === ' ') {
        current.textContent = `-${current.textContent}`
    }
    
    switch (e.key) {
        case "Escape":
            prev.textContent = '';
            current.textContent = '';
            break;
        case "Backspace":
            current.textContent = current.textContent.slice(0, -1);
            break;
        case "Shift" && "+":
            operator = "+"
            prev.textContent = equil(parseFloat(prev.textContent) || 0,  parseFloat(current.textContent)) + "+";
            if (prev.textContent.includes('NaN')) {
                prev.textContent = ''
            }
            current.textContent = '';
            break;
        case "Shift" && "*":
            operator = "*";
            prev.textContent = equil(parseFloat(current.textContent), parseFloat(prev.textContent)|| 1) + "*";
            if (prev.textContent.includes('NaN')) {
                prev.textContent = ''
            }
            current.textContent = '';
            break;
        case '-':
            operator = "-"
            prev.textContent = equil(parseFloat(current.textContent) || 0,  parseFloat(prev.textContent)||0) + "-";
            current.textContent = '';
            break;
        case '/':
            operator = "÷"; 
            if (prev.textContent !== '') {
                prev.textContent = equil(parseFloat(prev.textContent) || 0,  parseFloat(current.textContent))  + "÷";
            } else {
                prev.textContent = current.textContent + "÷";
            }
            if (prev.textContent.includes('NaN')) {
                prev.textContent = ''
            }
            current.textContent = '';
            break;
        case "Enter":
            if (prev.textContent.includes('.') && current.textContent.includes('.')) {
                current.textContent = fraction(parseFloat(current.textContent), parseFloat(prev.textContent), operator)
            } else  {
                current.textContent = equil(parseFloat(prev.textContent), parseFloat(current.textContent));
            }
            if (current.textContent === 'NaN') {
                current.textContent = ''
            }
            prev.textContent = '';
            isAnswer = true;
            break;
    }
});