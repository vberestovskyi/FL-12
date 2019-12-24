let doesExist = true;
let a = prompt('Enter length for triangular "A" side', '');
let b = prompt('Enter length for triangular "B" side', '');
let c = prompt('Enter length for triangular "C" side', '');

if (!isFinite(a) || !a || !isFinite(b) || !b || !isFinite(c) || !c) {
  doesExist = false;
  alert('Input values should be ONLY numbers');
} else if (parseInt(a) <= 0 || parseInt(b) <= 0 || parseInt(c) <= 0) {
  alert('A triangle must have 3 sides with a positive definite length');
}

a = parseInt(a);
b = parseInt(b);
c = parseInt(c);

if (!doesExist || c > a + b || b > a + c || a > b + c) {
  console.log('Triangle doesn’t exist');
} else if (doesExist && (a === b && b === c && c === a)) {
  console.log('Equilateral triangle’');
} else if (
  doesExist && a === b && a !== c && b !== c ||
  doesExist && b === c && b !== a && c !== a ||
  doesExist && c === a && c !== b && a !== b) {
  console.log('Isosceles triangle');
} else if (doesExist) {
  console.log('Scalene triangle');
}