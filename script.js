const display = document.getElementById("display-value");

function ClearDisplay() {
    display.value = "";
}

function addNumber(num) {
    // Only append the number or operator
    display.value += num;
}

function Result() {
    try {
        // Use Function constructor for slightly safer evaluation than direct eval
        // Still carries risks, but avoids direct eval scope issues.
        // A more robust solution would involve parsing the expression.
        const calculate = new Function('return ' + display.value);
        let result = calculate();

        // Handle potential floating point inaccuracies for simple cases
        if (Number.isFinite(result)) {
             // Limit decimal places if needed, e.g., to 10
             result = parseFloat(result.toFixed(10));
        } else if (result === Infinity || result === -Infinity || isNaN(result)){
             throw new Error("Invalid calculation"); // Treat division by zero etc. as error
        }


        display.value = result;
    } catch (error) {
        // If evaluation fails, show "Error"
        display.value = "Error";
        // Optional: Log the actual error to the console for debugging
        // console.error("Calculation Error:", error);
    }
}

function Del() {
    // Remove the last character from the display value
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
        event.preventDefault(); // Prevent default Enter behavior (like form submission)
        Result();
    } else if (key === 'Backspace') {
        Del();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        ClearDisplay();
    }
});