const display = document.getElementById("display-value");

function ClearDisplay() {
    display.value = "";
}

function addNumber(num) {
    display.value += num;
}

function Result() {
    try {
        const calculate = new Function('return ' + display.value);
        let result = calculate();

        if (Number.isFinite(result)) {
             result = parseFloat(result.toFixed(10));
        } else if (result === Infinity || result === -Infinity || isNaN(result)){
             throw new Error("Invalid calculation");
        }


        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

function Del() {
    display.value = display.value.slice(0, -1);
}

// Optional: Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9' || key === '.') {
        addNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        addNumber(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); 
        Result();
    } else if (key === 'Backspace') {
        Del();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        ClearDisplay();
    }
});