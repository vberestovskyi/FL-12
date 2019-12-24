let doesExist = true;
const a = +prompt('Enter length for triangular "A" side', '');
const b = +prompt('Enter length for triangular "B" side', '');
const c = +prompt('Enter length for triangular "C" side', '');


if (!isFinite(a) || isNaN(a) || !isFinite(b) || isNaN(b) || !isFinite(c) || isNaN(c)) {
  doesExist = false;
  alert('Input values should be ONLY numbers');
} else if (a <= 0 || !Number.isInteger(a) || b <= 0 || !Number.isInteger(b) || c <= 0 || !Number.isInteger(c)) {
  doesExist = false;
  alert('A triangle must have 3 sides with a positive definite length');
}

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