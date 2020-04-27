const display = document.querySelector("#display");
let displayValue = "",
	storedValue = "",
	storedOperator = "",
		evaluated = false;

function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	return (num1 / num2).toFixed(4);
}

function operate(operator = "", num1, num2) {
	if (num2 == "") {
		num2 = 0;
	}

	if (operator == "") {
		return displayValue;
	} else	if (operator == "+") {
		return add(num1, num2);
	} else if (operator == "-") {
		return subtract(num1, num2);
	} else if (operator == "x") {
		return multiply(num1, num2);
	} else if (operator == "/") {
		if (num2 == 0) {
			return "Can't divide by zero";
		}
		return divide(num1, num2);
	} 
}

function numberInput(e) {
	if (evaluated) {
		displayValue = e.target.innerText;
		display.innerText = displayValue;
		
		storedValue = 0;
		storedOperator = "";
		evaluated = false;
		return;
	} else if (display.innerText == 0) {
		display.innerText = displayValue;
	} else if (e.target.innerText == ".") {
		if (displayValue.match(/[.]/g)) {
			return;
		}
	}
	displayValue += e.target.innerText;
	display.innerText = displayValue;
	
}

function operatorInput(e) {
	evaluated = false;
	if (storedOperator != 0) {
		storedValue = operate(
		storedOperator,
		parseFloat(storedValue),
		parseFloat(displayValue)
	);
	} else {
		storedValue = displayValue;
	}
	displayValue = "";
	storedOperator = e.target.innerText;
	display.innerText = e.target.innerText;
}

function equal() {
	let answer = operate(
		storedOperator,
		parseFloat(storedValue == 0 ? storedValue = 0 : storedValue = storedValue),
		parseFloat(displayValue == 0 ? displayValue = 0 : displayValue = displayValue)
	);
	display.innerText = answer;
	evaluated = true;
}

function clear() {
	display.innerText = 0;
	displayValue = "";
	storedValue = "";
	storedOperator = "";
	evaluated = false;
}

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => number.addEventListener("click", numberInput));

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) =>	operator.addEventListener("click", operatorInput));

const equals = document.querySelector("#equals");
equals.addEventListener("click", equal);

const  clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clear);