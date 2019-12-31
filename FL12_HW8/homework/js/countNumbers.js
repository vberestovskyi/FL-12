function makeNumber(inputString) {
  if (inputString) {
    let outputString = '';
    for (const symbol of inputString) {
      if (!isNaN(+symbol)) {
        outputString += symbol;
      }
    }
    return outputString;
  }
}

/* The following function has some redundant functionality, because we were told

Task 5: Чи можна щоб в об’єкті, який повертається ключі були без лапок?
ні

Perhaps I misinterpreted it.
Also in the given example keys are sorted. Without quotes keys are being sorted by default.
In order to achieve it in my case, had to sort those numbers before creating an object
*/ 

function countNumbers(inputString) {
  if (inputString) {
    const numberString = Array.from(makeNumber(inputString)).sort();
    console.log(numberString);
    console.log(inputString);
    
    let output = {};
    for (let number of numberString) {
      if (!Object.prototype.hasOwnProperty.call(output, `'${number}'`)) {
        Object.defineProperty(output, `'${number}'`, {
          writable: true,
          value: 1
        });
      } else {
        Object.defineProperty(output, `'${number}'`, {
          value: (output[`'${number}'`] + 1)
        });
      }
    }
    return output ;
  } else if (inputString === '') {
    return new Object();
  }
}

countNumbers();

