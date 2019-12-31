function makeNumber(inputString) {
  if (inputString) {
    let outputString = '';
    for (let symbol of inputString) {
      if (!isNaN(+symbol)) {
        outputString += symbol;
      }
    }
    return outputString;
  }
}
makeNumber();