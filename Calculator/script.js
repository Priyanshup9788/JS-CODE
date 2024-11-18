function append(value) {
    let display = document.getElementById("display");

    if (value === "=") {
        try {
            display.value = eveluate(display.value);
        } catch (error) { }
    }
    else if (value === "C") {
        display.value = "";
    }
    else {
        display.value += value;
    }

}

console.log("hello");

function eveluate(expression) {
    expression = expression.replace(`/s+\g`, "");
    let result = 0;
    let oparator = "+";
    let currentNumber = ""
    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];
        if (/\d/.test(char) || char === '.') {
            currentNumber += char;
        }
        else if (["+", "-", "*", "/", "%"].includes(char)) {
            if (currentNumber) {
                result = performOparation(result, parseFloat(currentNumber), oparator);
                currentNumber = "";
            }
            oparator = char;
        }
    }
    if (currentNumber) {
        result = performOparation(result, parseFloat(currentNumber), oparator);
    }
    return result;
}

function performOparation(a, b, opr) {
    switch (opr) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b !== 0) {
                return parseFloat(a / b).toFixed(2);
            }
        case "%":
            if (b !== 0) {
                return a % b;
            }
    }
}