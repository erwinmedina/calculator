const buttons = [...document.querySelectorAll(".buttonContainer div")];
const screen = document.getElementById("screen");
const previous = document.getElementById("previous");

let list = ['+', '-', 'x', '/'];
let calculation = {
    first: '',
    operation: '',
    second: '',
    result: '',
    continue: false,
}


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleClick);
}

function render(value) {
    screen.innerHTML = value;
}

function handleClick(event) {
    const buttonIndex = event.target.getAttribute('id');
    
    restart(buttonIndex);
    handleSign(buttonIndex);
    handleNumbers(buttonIndex);
    handleOperation(buttonIndex);
    handleComputation(buttonIndex);
}

function handleNumbers(buttonIndex) {
    // Accounts for equal button with empty first or second entry //
    if (buttonIndex === '=' || buttonIndex === 'C' || buttonIndex === '?') return;
    if (buttonIndex === 'sign') return;
    if (calculation.continue === true) return;
    if (calculation.first === 'NaN') return;

    // Accounts for the first entry.
    if (list.indexOf(buttonIndex) === -1 && calculation.operation === '') {
        if (calculation.first.length > 12) return;
        calculation.first += buttonIndex;
        render(calculation.first);
        return calculation.first;
    }

    // Accounts for the second entry.
    if (list.indexOf(buttonIndex) === -1 && calculation.operation !== '') {
        if (calculation.second.length > 12) return;
        calculation.second += buttonIndex;
        render(calculation.second);
        return calculation.second;
    }
}

function handleSign(buttonIndex) {
    if (isNaN(calculation.first)) return;

    if (buttonIndex === 'sign') {
        if (calculation.first === '') {
            calculation.first += '-';
            render(calculation.first);
        }

        else if (calculation.operation === '') {
            let temp = parseFloat(calculation.first);
            temp *= -1;
            calculation.first = (temp.toString());
            render(calculation.first);
        }
        else if (calculation.second === '') {
            calculation.second += '-';
            render(calculation.second);
        }
        else if (calculation.operation !== '') {
            let temp = parseFloat(calculation.second);
            temp *= -1;
            calculation.second = temp.toString();
            render(calculation.second);
        }
    }
}

function handleOperation(buttonIndex) {
    if (isNaN(calculation.first)) return;

    if (list.indexOf(buttonIndex) !== -1 && calculation.first !== '' && calculation.second === '') {
        calculation.operation = buttonIndex;
        render(calculation.operation);
        calculation.continue = false;
        return calculation.operation;
    }
}

function handleComputation(buttonIndex) {
    if (calculation.first === '' || calculation.second === '') return;
    if (buttonIndex === '=') {
        let firstValue = parseFloat(calculation.first);
        let secondValue = parseFloat(calculation.second);
        
        if (calculation.operation === '+') {
            calculation.result = firstValue + secondValue;
        }
        else if (calculation.operation === '-') {
            calculation.result = firstValue - secondValue;
        }
        else if (calculation.operation === 'x') {
            calculation.result = firstValue * secondValue;
        }
        else if (calculation.operation === '/') {
            calculation.result = firstValue / secondValue;
        }
        render(calculation.result);
        savePrevious();
        continueOn();
        return(calculation.result);
    }

}

function savePrevious() {
    previous.style.visibility = 'visible';
    previous.innerHTML = `${calculation.first} ${calculation.operation} ${calculation.second} =`;
}

function continueOn() {
        calculation.first = calculation.result;
        calculation.operation = '';
        calculation.second = '';
        calculation.result = '';
        calculation.continue = true;
        return calculation;
}

function restart(buttonIndex) {
    if (buttonIndex === 'C') {
        calculation.first = '';
        calculation.operation = '';
        calculation.second = '';
        calculation.continue = false;
        previous.style.visibility = 'hidden';

        render(0);
        return calculation;
    }
}