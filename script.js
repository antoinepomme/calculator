const buttons = document.querySelectorAll('button');
let display = document.querySelector('.display');

displayDefault = "0";
display.textContent = displayDefault;

let prev = 0;
let operator = 0;
let resetDisplay = 0;
prevLocked = 0;
error = 0;

buttons.forEach((item) => {
    item.addEventListener('click', () => {
        parse(item.classList, item.id, item)
    });
});

function parse(type, id) {
    if (id === "ac" || display.textContent === "Error") {
        display.textContent = displayDefault;
        operator = 0;
        if (prevLocked) {
            unlockButton(prevLocked);
        }
    }
    if (type[0] === "numbers" && type[1]) { 
        if (operator != 0 && resetDisplay == 1) {
            display.textContent = id;
            resetDisplay = 0;
        } else {
        (display.textContent === "0") ? display.textContent = id :
        displayAppend("numbers", id);
        }
    }
    if (type[0] === "right" && type[1]) {
        if (operator != 0) {
            calculator();
        }
        prev = display.textContent;
        operator = id;
        resetDisplay = 1;
        if (prevLocked) {
            unlockButton(prevLocked);
        }
        lockButton(id);
    }
    if (id === "equal" && operator != 0) {
        calculator();
        operator = 0;
        unlockButton(prevLocked);
    }
}

function calculator () {
    switch (operator) {
        case "+":
            add(+prev, +display.textContent);
            break;
        case "-":
            sub(+prev, +display.textContent);
            break;
        case "*":
            multiply(+prev, +display.textContent);
            break;
        case "/":
            divide(+prev, +display.textContent);
            break;
    }
    operator = 0;
}

function displayAppend (type, id) {
    if (type === "numbers") {
        (display.textContent.length < 8) ? display.textContent += id : 
        false;
    }
}

function add(a, b) {
    (a + b + '').length < 8 ? display.textContent = a + b + '' :
    display.textContent = expo(a + b, 2) + '';
}

function sub(a, b) {
    (a - b + '').length < 8 ? display.textContent = a - b + '' :
    display.textContent = expo(a - b, 2) + '';
}

function multiply(a, b) {
    (a * b + '').length < 8 ? display.textContent = a * b + '' :
    display.textContent = expo(a * b, 2) + '';
}

function divide(a, b) {
    if (b == '0') {
        display.textContent = "Error";
        return;
    }
    ((a / b).toFixed(2) + '').length < 8 ? 
    display.textContent = (a / b).toFixed(2) + '' :
    display.textContent = expo((a / b).toFixed(2), 2) + '';
}

function lockButton (id) {
    document.getElementById(id).style.backgroundColor = "#972f36";
    document.getElementById(id).style.transform = "translateY(3px)";
    prevLocked = id;
}

function unlockButton (id) {
    document.getElementById(id).style.backgroundColor = "#ff6973";
    document.getElementById(id).style.transform = "translateY(0px)";
    prevLocked = 0;
}

function expo(x, f) {
    return Number.parseFloat(x).toExponential(f);
  }