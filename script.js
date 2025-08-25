function addition(a, b) {
    return a + b;
}

function subtraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    if (operator === "+") return addition(a, b);
    if (operator === "-") return subtraction(a, b);
    if (operator === "x") return multiplication(a, b);
    if (operator === "/") return division(a, b);
    return null;
}

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;

const display = document.querySelector(".display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const decimalBtn = document.querySelector(".decimal");

digits.forEach(button => {
    button.addEventListener("click", () => appendNumber(button.textContent));
});

function appendNumber(num) {
    if (display.textContent === "0" || shouldResetScreen) {
        display.textContent = num;
        shouldResetScreen = false;
    }
    else {display.textContent += num;}
    updateDecimalNumber();
}

operators.forEach(button => {
    button.addEventListener("click", () => {setOperator(button.textContent)});
});

function setOperator(op) {
    if (currentOperator !== null && !shouldResetScreen) {
        secondNumber = display.textContent;
        display.textContent = operate(currentOperator, firstNumber, secondNumber);
    }
    firstNumber = display.textContent;
    currentOperator = op;
    shouldResetScreen = true;
    updateDecimalNumber();
}

equals.addEventListener("click", () => {
    if (currentOperator === null || shouldResetScreen) return;
    secondNumber = display.textContent;
    display.textContent = operate(currentOperator, firstNumber, secondNumber);
    currentOperator = null;
    shouldResetScreen = true;
    updateDecimalNumber();
});

clear.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    shouldResetScreen = false;
    updateDecimalNumber();
});

backspace.addEventListener("click", () => {
    if (shouldResetScreen) return;
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    }
    else {
        display.textContent = "0";
    }
    updateDecimalNumber();
});

decimalBtn.addEventListener("click", () => {
    if (shouldResetScreen) {
        display.textContent = "0";
        shouldResetScreen = false;
    }
    else if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
    updateDecimalNumber();
})

function updateDecimalNumber() {
    if (display.textContent.includes(".")) {
        decimalBtn.disabled = true;
    }
    else {
        decimalBtn.disabled = false;
    }
}

window.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === ".") decimalBtn.click();
    if (e.key === "=" || e.key === "Enter") equals.click();
    if (e.key === "Backspace") backspace.click();
    if (e.key === "Escape") clear.click();
    if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
}