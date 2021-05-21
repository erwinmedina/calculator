const buttons = [...document.querySelectorAll(".buttonContainer div")];
const screen = document.getElementById("screen");
const previous = document.getElementById("previous");

let list = ['+', '-', 'x', '/'];
let calculation = {
    first: '',
    operation: '',
    second: '',
    result: '',
}


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleClick);
}

function render(value) {
    screen.innerHTML = value;
}

function handleClick(event) {
    const buttonIndex = event.target.getAttribute('id');

    handleNumbers(buttonIndex);
    handleOperation(buttonIndex);
    handleComputation(buttonIndex);
}

function handleNumbers(buttonIndex) {
    // Accounts for equal button with empty first or second entry //
    if (buttonIndex === '=' || buttonIndex === 'C') return;

    // Accounts for the first entry.
    if (list.indexOf(buttonIndex) === -1 && calculation.operation === '') {
        calculation.first += buttonIndex;

        render(calculation.first);
        console.log(calculation.first);
    }

    // Accounts for the second entry.
    if (list.indexOf(buttonIndex) === -1 && calculation.operation !== '') {
        calculation.second += buttonIndex;

        render(calculation.second);
        console.log(calculation);
    }
}

function handleOperation(buttonIndex) {
    if (list.indexOf(buttonIndex) !== -1 && calculation.first !== '' && calculation.second === '') {
        calculation.operation = buttonIndex;
        render(calculation.operation);
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
        restart();
    }

}

function savePrevious() {
    previous.style.visibility = 'visible';
    previous.innerHTML = `${calculation.first} ${calculation.operation} ${calculation.second} = ${calculation.result}`;
}

function restart() {
    calculation.first = '';
    calculation.operation = '';
    calculation.second = '';
}