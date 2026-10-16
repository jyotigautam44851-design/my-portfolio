
let display = document.getElementById("display");

function appendValue(value) {

    if (display.value === "0") {
        display.value = value;
    } 
    else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {

    if (display.value.length === 1) {
        display.value = "0";
    } 
    else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {

    try {

        let expression = display.value;

        // Percentage
        expression = expression.replace(
            /(\d+)%/g,
            "($1/100)"
        );

        let result = eval(expression);

        display.value = result;

    } 
    catch (error) {

        display.value = "Error";

        setTimeout(() => {
            display.value = "0";
        }, 1200);
    }
}

/* Keyboard support */

document.addEventListener("keydown", function(event) {

    let key = event.key;

    if (
        !isNaN(key) ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ) {
        appendValue(key);
    }

    else if (key === "Enter") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

});
