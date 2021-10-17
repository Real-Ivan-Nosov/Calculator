const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

const sendNumberValue = (number) => {
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // If current display value 0, replace it
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

const addDecimal = () => {
    if (awaitingNextValue) return;
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

const useOperator = (operator) => {
    const currentValue = Number(calculatorDisplay.textContent);
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return};
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;

}

const resetAll = () => {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Add Event Listeners btns
inputBtns.forEach((btn) => {
    if (btn.classList.length === 0) {
        btn.addEventListener('click', () => sendNumberValue(btn.value));
    } else if (btn.classList.contains('operator')) {
        btn.addEventListener('click', () => useOperator(btn.value));
    } else if (btn.classList.contains('decimal')) {
        btn.addEventListener('click', () => addDecimal());
    }
})

// Event Listener
clearBtn.addEventListener('click', resetAll)