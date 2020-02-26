// Task 1
const array = [1, 2, 3, 4, 56, 7, 8, 76, 5, 241, 5, 356, 567, 2];
function maxElement(array) {
  return Math.max(...array);
}
console.log(maxElement(array));

// Task 2
const copiedArray = copyArray(array);
function copyArray(array) {
  return [...array];
}
console.log(array, copiedArray);
console.log(array === copiedArray);

// Task 3
const myObj = {name: 123};
function addUniqueId(element) {
  const id = Symbol('id');
  return {id, ...element};
}
console.log(addUniqueId(myObj));

// Task 4
const oldObj = {
  name: 'Someone',
  details: {
    id: 1,
    age: 11,
    university: 'UNI',
  },
};
function regroupObject(object) {
  const {
    name,
    details: {
      id,
      age,
      university,
    },
  } = object;
  const newObj = {
    university: university,
    user: {
      age: age,
      firstName: name,
      id: id,
    },
  };
  return newObj;
}
console.log(regroupObject(oldObj));

// Task 5
function findUniqueElements(array) {
  return Array.from(new Set(array));
}
console.log(findUniqueElements(array));

// Task 6
const phoneNumber = '0123456789';
function hideNumber(phoneNumber) {
  const visibleNumbers = 4;
  return phoneNumber.substring(phoneNumber.length - visibleNumbers).padStart(phoneNumber.length, '*');
}
console.log(hideNumber(phoneNumber));

// Task 7
const required = () => {
  throw new Error('Missing property');
};
function add(a = required(), b = required()) {
  return a + b;
}
console.log(add(1));


// Task 8
function sortWithPromise() {
  fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json();
      })
      .then((people) => {
        const names = [];
        people.forEach((person) => names.push(person.name));
        names.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
        console.log(names);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}
sortWithPromise();

// Task 9
async function sortWithAsync() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const people = await response.json();
    const names = [];
    people.forEach((person) => names.push(person.name));
    names.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
    console.log(names);
  } catch (err) {
    console.log('Error', err);
  }
}
sortWithAsync();
