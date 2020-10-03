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

const sum = (a, b) => {
    b = b.slice(0,-1);
    let [intA, decA] = a.split('.');
    let [intB, decB] = b.split('.');
    const x = Math.pow(10, decA.length);
    const y = Math.pow(10, decB.length);
    return Number(intA) + Number(intB) + (Number(decA) * y + Number(decB) * x) / x / y;      
}

const difference = (a, b) => { 
    a = a.slice(0, -1);
    let [intA, decA] = a.split('.');
    let [intB, decB] = b.split('.');        
    const x = Math.pow(10, decA.length);
    const y = Math.pow(10, decB.length);
    return Number(intA) - Number(intB) + (Number(decA) * y - Number(decB) * x) / x / y;      
}

parent.addEventListener('click', (e) => {
    if (e.target == parent) {
        return;
    }

    if (e.target.textContent == '.' && current.textContent.includes('.') || e.target.textContent === '+' && prev.textContent.includes('+') || e.target.textContent === '±' && current.textContent.includes('-')) {
        return;
    }

    if (Number(e.target.textContent) || e.target.textContent == '.' || e.target.textContent == '0') {
        if (isAnswer == true) {
            current.textContent = '';
            isAnswer = false;
        }
        current.textContent += e.target.textContent;
    }
    
    if (e.target.textContent == '±') {
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
            current.textContent = Math.sqrt(current.textContent);
            isAnswer = true;
            break;
        case "^":
            operator = "^"
            if (prev.textContent !== '') {
                prev.textContent = equil(parseFloat(prev.textContent) || 0,  parseFloat(current.textContent))  + "^";
            } else {
                prev.textContent = +current.textContent + "^";
            }
            current.textContent = '';
            break;
        case "+":
            operator = "+"
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
            prev.textContent = equil(parseFloat(prev.textContent) || 1,  parseFloat(current.textContent)) + "*";
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
                prev.textContent = ''
            }
            current.textContent = '';
            break;
        case "=":
            if (prev.textContent.includes('.') && current.textContent.includes('.')) {                
                if (operator === '+')
                    current.textContent = sum(current.textContent, prev.textContent);
                if (operator === '-')
                    current.textContent = difference(prev.textContent, current.textContent);                
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

document.addEventListener('keydown', (e) => {
    console.log(Number(e.key));
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
                if (operator === '+')
                    current.textContent = sum(current.textContent, prev.textContent);
                if (operator === '-')
                    current.textContent = difference(prev.textContent, current.textContent);                
            } else  {
                current.textContent = equil(parseFloat(prev.textContent), parseFloat(current.textContent));
            }
            if (current.textContent === 'NaN' || current.textContent === '') {
                current.textContent = ''
            }
            prev.textContent = '';
            isAnswer = true;
            break;
    }
});