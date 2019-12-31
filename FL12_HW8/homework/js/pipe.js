function addOne(x) {
  return x + 1;
}

function pipe() {
  let input = [...arguments]
  let number = input.shift();
  for (let i = 0; i < input.length; i++) {
    console.log('before', number);
    number = addOne(number);
    console.log('after', number);
  }
  return number;
}

pipe();