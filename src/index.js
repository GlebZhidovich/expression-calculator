function eval() {
    // Do not use eval!!!
    return;
}

function calculateNumber(mark , expresion , index) {
    let number;
    if (expresion[index + 1] === '0' && mark === '/' ) {
        throw new Error('TypeError: Division by zero.');
    }
    if (mark === '/') {
        number = expresion[index - 1] / expresion[index + 1];
    }
    if (mark === '*') {
        number = expresion[index - 1] * expresion[index + 1];
    }
    if (mark === '+') {
        number = +expresion[index - 1] + +expresion[index + 1];
    }
    if (mark === '-') {
        number = +expresion[index - 1] - +expresion[index + 1];
    }
    return number;
}

function calculate(expr) {

    const marksCalculation = ['/', '*', '-', '+'];
    let expresion = expr;
    marksCalculation.forEach(mark => {
        let index = expresion.indexOf(mark);
        while (index !== -1) {
            let number = calculateNumber(mark, expresion, index);
            expresion = [...expresion.slice(0, index - 1), number.toString(), ...expresion.slice(index + 2, expresion.length)];
            index = expresion.indexOf(mark);
        }
    });
    const [number] = expresion.filter((elem) => {
        return !isNaN(parseInt(elem));
    });
    return number;
}

function expressionCalculator(expr) {
    const exprReg = /\d+|\D/g;
    const rightBracket = ')';
    const leftBracket = '(';
    let exprArray = expr.match(exprReg).filter((elem) => elem !== ' ');
    let firstRightBracket = exprArray.indexOf(rightBracket);
    let closeBracket = exprArray.lastIndexOf(leftBracket, firstRightBracket);

    if (firstRightBracket === -1 && closeBracket !== -1 || firstRightBracket !== -1 && closeBracket === -1) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    while (firstRightBracket !== -1) {
        const expression = exprArray.slice(closeBracket, firstRightBracket + 1);

        let number = calculate(expression);
        exprArray = [...exprArray.slice(0, closeBracket), number, ...exprArray.slice(firstRightBracket + 1, exprArray.length)];
        firstRightBracket = exprArray.indexOf(rightBracket);
        closeBracket = exprArray.lastIndexOf(leftBracket, firstRightBracket);
    }
    firstRightBracket = exprArray.indexOf(rightBracket);
    closeBracket = exprArray.lastIndexOf(leftBracket, firstRightBracket);
    if (firstRightBracket === -1 && closeBracket !== -1 || firstRightBracket !== -1 && closeBracket === -1) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    exprArray = calculate(exprArray);

    return parseFloat(parseFloat(exprArray).toFixed(4));
}

module.exports = {
    expressionCalculator
}