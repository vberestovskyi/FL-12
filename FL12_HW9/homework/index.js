function convert() {
  let output = [];
  for (const element of arguments) {
    if (typeof element === 'string') {
      output.push(parseInt(element));
    } else {
      output.push(`${element}`);
    }
  }
  return output;
}

function executeforEach(input, modifier) {
  for (let element of input) {
    modifier(element);
  }
}

function mapArray(input, mapper) {
  let myArray = [];
  function toNumber(element) {
    if (typeof element === 'string') {
      element = parseInt(element);
    }
    myArray.push(mapper(element));
  }
  executeforEach(input, toNumber);
  return myArray;
}

function filterArray(array, filter) {
  let myArray = [];
  function checker(element) {
    if (filter(element)) {
      myArray.push(element);
    }
  }
  executeforEach(array, checker);
  return myArray;
}

function flipOver(input) {
  let output = '';
  for (let i = input.length - 1; i >= 0; i--) {
    output += input[i];
  }
  return output;
}

function makeListFromRange(range) {
  let output = [];
  for (let i = range[0]; i <= range[1]; i++) {
    output.push(i);
  }
  return output;
}

function getArrayOfKeys(array, key) {
  let output = [];
  function returnKey(element) {
    output.push(element[key]);
  }
  executeforEach(array, returnKey);
  return output;
}

function substitute(numbers) {
  const minNumber = 30;
  function compareNumber(number) {
    if (number < minNumber) {
      number = '*';
    }
    return number;
  }
  return mapArray(numbers, compareNumber);
}

function getPastDay(defaultDate, daysAgo) {
  const dayMiliseconds = 86400000;
  const defaultMiliseconds = defaultDate.valueOf();
  const searchedDate = new Date(defaultMiliseconds - dayMiliseconds * daysAgo);
  return searchedDate.getDate();
}

function formatDate(input) {
  const formatter = 10;
  const date = `${input.getFullYear()}/${input.getMonth() + 1}/${input.getDate()} `;
  const hours = `${input.getHours() < formatter ? '0' + input.getHours() : input.getHours()}:`;
  const minutes = `${input.getMinutes() < formatter ? '0' + input.getMinutes() : input.getMinutes()}`;
  return date + hours + minutes;
}