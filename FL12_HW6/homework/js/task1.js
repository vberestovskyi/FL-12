let isInputValid = true;
const two = 2;
const four = 4;

let a = prompt('Enter value "A" for quadratic equation', '');
let b = prompt('Enter value "B" for quadratic equation', '');
let c = prompt('Enter value "C" for quadratic equation', '');

if (!isFinite(a) || !a || parseFloat(a) === 0 || !isFinite(b) || !b || !isFinite(c) || !c) {
  isInputValid = false;
  console.log('Invalid input data');
}
a = parseFloat(a);
b = parseFloat(b);
c = parseFloat(c); 
const d = Math.pow(b, two) - four * a * c;

if (!isInputValid) {
  console.log('No solution')
} else if (d > 0) {
  const x1 = Math.round((-b + Math.sqrt(d)) / two * a);
  const x2 = Math.round((-b - Math.sqrt(d)) / two * a);
  console.log('x1 = ', x1, ' and x2 = ', x2);
} else if (d === 0) {
  const x = Math.round(-b / two * a);
  console.log('x = ', x);
} else { 
  console.log('No solution') 
}




