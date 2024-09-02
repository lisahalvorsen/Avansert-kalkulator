// Model
let app = document.getElementById('app');
let float1 = '';
let float2 = '';
let operator = null;
let answer = null;
let expression = '';
let squaredNumber1 = '';
let squaredNumber2 = '';
let squareRootNumber1 = '';
let squareRootNumber2 = '';

// View
function updateView() {
    app.innerHTML = /*HTML*/ `
    
    <div id="container">
        <div id="display">
            <div id="expression">${expression}</div>
            <div>${float1}${operator ?? ''}${float2}${answer ?? ''}</div>
        </div>

        <div id="calculator">
            <button onclick="turnIntoPercentage()">%</button>
            <button onclick="clearEntry()">CE</button>
            <button onclick="clearWindow()">C</button>
            <button onclick="clearLastCharacter()">⌫</button>
            <button onclick="findTheReciprocal()">1/x</button>
            <button onclick="squareTheNumber()">x<sup>2</sup></button>
            <button onclick="findTheRoot()">2√x</button>
            <button onclick="appendOperator('/')">÷</button>
            <button onclick="appendNumber('7')">7</button>
            <button onclick="appendNumber('8')">8</button>
            <button onclick="appendNumber('9')">9</button>
            <button onclick="appendOperator('*')">×</button>
            <button onclick="appendNumber('4')">4</button>
            <button onclick="appendNumber('5')">5</button>
            <button onclick="appendNumber('6')">6</button>
            <button onclick="appendOperator('-')">-</button>
            <button onclick="appendNumber('1')">1</button>
            <button onclick="appendNumber('2')">2</button>
            <button onclick="appendNumber('3')">3</button>
            <button onclick="appendOperator('+')">+</button>
            <button onclick="switchToOppositeSign()">+/-</button>
            <button onclick="appendNumber('0')">0</button>
            <button onclick="appendComma(',')">,</button>
            <button onclick="performCalculation()">=</button>
        </div>
    </div>
    `;
}

updateView();

// Controller
function appendNumber(number) {
    if (operator == null) {
        float1 += number;
    } else {
        float2 += number;
    }
    updateView();
}

function appendOperator(op) {
    if (float1 !== '' && operator == null) {
        operator = op;
    } else if (answer !== '') {
        float1 = answer;
        float2 = '';
        answer = '';
        operator = op;
    }
    updateView();
}

function appendComma() {
    if (operator == null) {
        if (!float1.includes('.')) {
            float1 += '.';
        }
    } else {
        if (!float2.includes('.')) {
            float2 += '.';
        }
    }
    updateView();
}

function checkIfSquared() {
    if (squaredNumber1 !== '' && squaredNumber2 !== '') {
        float1 = squaredNumber1;
        float2 = squaredNumber2;
    } else if (operator !== null && squaredNumber1 !== '') {
        float1 = squaredNumber1;
    } else if (operator !== null && squaredNumber2 !== '') {
        float2 = squaredNumber2;
    }
}

function checkIfSquareRooted() {
    if (squareRootNumber1 !== '' && squareRootNumber2 !== '') {
        float1 = squareRootNumber1;
        float2 = squareRootNumber2;
    } else if (operator !== null && squaredNumber1 !== '') {
        float1 = squareRootNumber1;
    } else if (operator !== null && squareRootNumber2 !== '') {
        float2 = squareRootNumber2;
    }
}

function clearEntry() {
    if (float2 !== '') {
        float2 = '';
    } else if (operator !== null) {
        operator = null;
    } else if (float1 !== '') {
        float1 = '';
    } else if (answer !== null) {
        answer = null;
    }
    updateView();
}

function clearLastCharacter() {
    if (float2 !== '') {
        float2 = float2.slice(0, -1);
    } else if (operator !== null) {
        operator = null;
    } else if (float1 !== '') {
        float1 = float1.slice(0, -1);
    } else if (answer !== null) {
        answer = null;
    }
    updateView();
}

function clearWindow() {
    float1 = '';
    float2 = '';
    operator = null;
    answer = null;
    expression = '';
    squaredNumber1 = '';
    squaredNumber2 = '';
    squareRootNumber1 = '';
    squareRootNumber2 = '';
    updateView();
}

function findTheReciprocal() {
    if (answer !== null && float1 === '' && float2 === '') {
        answer = (1 / parseFloat(answer)).toString();
        expression = `1 / ${answer} = ${answer}`;
    } else if (operator === null && float1 !== '') {
        float1 = (1 / parseFloat(float1)).toString();
        expression = `1 / ${float1} = ${float1}`;
    } else if (operator !== null && float2 !== '') {
        float2 = (1 / parseFloat(float2)).toString();
        expression = `1 / ${float2} = ${float2}`;
    }
    updateView();
}

function findTheRoot() {
    if (answer !== null && float1 === '' && float2 === '') {
        squareRootNumber1 = Math.sqrt(parseFloat(answer)).toString();
        answer = `√${answer}`;
        expression = `√${answer} = ${squareRootNumber1}`;
    } else if (operator === null && float1 !== '') {
        squareRootNumber1 = Math.sqrt(parseFloat(float1)).toString();
        float1 = `√${float1}`;
        expression = `√${float1} = ${squareRootNumber1}`;
    } else if (operator !== null && float2 !== '') {
        squareRootNumber2 = Math.sqrt(parseFloat(float2)).toString();
        float2 = `√${float2}`;
        expression = `√${float2} = ${squareRootNumber2}`;
    }
    updateView();
}

function performCalculation() {
    checkIfSquared();
    checkIfSquareRooted();

    let num1 = parseFloat(squaredNumber1 || squareRootNumber1 || float1);
    let num2 = parseFloat(squaredNumber2 || squareRootNumber2 || float2);

    if (operator === '+') {
        answer = (num1 + num2).toString();
        expression = `${num1} + ${num2} = ${answer}`;
    } else if (operator === '-') {
        answer = (num1 - num2).toString();
        expression = `${num1} - ${num2} = ${answer}`;
    } else if (operator === '*') {
        answer = (num1 * num2).toString();
        expression = `${num1} * ${num2} = ${answer}`;
    } else if (operator === '/') {
        answer = (num1 / num2).toString();
        expression = `${num1} / ${num2} = ${answer}`;
    }

    float1 = '';
    float2 = '';
    operator = null;
    squaredNumber1 = '';
    squaredNumber2 = '';
    squareRootNumber1 = '';
    squareRootNumber2 = '';
    updateView();
}

function squareTheNumber() {
    if (answer !== null && float1 === '' && float2 === '') {
        squaredNumber1 = Math.pow(parseFloat(answer), 2).toString();
        answer = `${answer}<sup>2</sup>`;
        expression = `${answer} = ${squaredNumber1}`;
    } else if (operator === null && float1 !== '') {
        squaredNumber1 = Math.pow(parseFloat(float1), 2).toString();
        float1 = `${float1}<sup>2</sup>`;
        expression = `${float1} = ${squaredNumber1}`;
    } else if (operator !== null && float2 !== '') {
        squaredNumber2 = Math.pow(parseFloat(float2), 2).toString();
        float2 = `${float2}<sup>2</sup>`;
        expression = `${float2} = ${squaredNumber2}`;
    }
    updateView();
}

function switchToOppositeSign() {
    if (answer !== null && float1 === '' && float2 === '') {
        answer = (-parseFloat(answer)).toString();
        expression = `-${answer}`;
    } else if (operator === null && float1 !== '') {
        float1 = (-parseFloat(float1)).toString();
        expression = `-${float1}`;
    } else if (operator !== null && float2 !== '') {
        float2 = (-parseFloat(float2)).toString();
        expression = `-${float2}`;
    }
    updateView();
}

function turnIntoPercentage() {
    if (answer !== null && float1 === '' && float2 === '') {
        answer = (parseFloat(answer) / 100).toString();
        expression = `${answer}%`;
    } else if (operator === null && float1 !== '') {
        float1 = (parseFloat(float1) / 100).toString();
        expression = `${float1}%`;
    } else if (operator !== null && float2 !== '') {
        float2 = (parseFloat(float2) / 100).toString();
        expression = `${float2}%`;
    }
    updateView();
}