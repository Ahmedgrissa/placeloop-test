let maxNumber = 55;
let output = "";
let indexOfLine = 1;
let numberOfElementsPerLine = 0;
for (let i = 1; i <= maxNumber; i++) {
    output += i + " ";
    numberOfElementsPerLine++;
    if (numberOfElementsPerLine === indexOfLine) {
        console.log(output);
        output = "";
        indexOfLine++;
        numberOfElementsPerLine = 0;
    }
}