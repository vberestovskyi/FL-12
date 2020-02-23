/*You'll need to implement inheritance in JS: a base class Employee 
that takes a single data object, two derived from it classes:
Manager and BlueCollarWorker, and two more classes that inherit from Manager: 
HRManager and SalesManager.
*/
class Employee {
  static get EMPLOYEES() {
    if (!Employee._EMPLOYEES)
      Employee._EMPLOYEES = [];
    return Employee._EMPLOYEES;
  }


  constructor(person) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.birthday = person.birthday;
    this.salary = person.salary;
    this.position = person.position;
    this.department = person.department;
    this.init = function () {
      Employee.EMPLOYEES.push(this);
      //console.log(Employee.EMPLOYEES);
    };
    this.init();
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  get age() {
    const todayYear = new Date().getFullYear();
    const birthYear = new Date(this.birthday).getFullYear();
    return todayYear - birthYear;
  }

  changeDepartment(newDepartment) {
    this.department = newDepartment;
  }

  changePosition(newPosition) {
    this.position = newPosition;
  }

  changeSalary(newSalary) {
    this.salary = newSalary;
  }

  quit() {
    const EMPLOYEES = Employee.EMPLOYEES;
    const index = EMPLOYEES.findIndex(element => element.id === this.id);
    EMPLOYEES.splice(index, 1)
    console.log(Employee.EMPLOYEES);
  }

  retire() {
    const EMPLOYEES = Employee.EMPLOYEES;
    const index = EMPLOYEES.findIndex(element => element.id === this.id);
    EMPLOYEES.splice(index, 1)
    console.log('It was such a pleasure to work with you!');
    console.log(Employee.EMPLOYEES);
  }

  getFired() {
    const EMPLOYEES = Employee.EMPLOYEES;
    const index = EMPLOYEES.findIndex(element => element.id === this.id);
    EMPLOYEES.splice(index, 1)
    console.log('Not a big deal!');
    console.log(Employee.EMPLOYEES);
  }

  getPromoted(newBenefits) {
    for (const benefit in newBenefits) {
      if (this[benefit]) {
        this[benefit] = newBenefits[benefit];
      }
      //getPromoted ({salary: 8000, department: 'hr'});
    }
    console.log(this);
    console.log('Yoohooo!');
  }

  getDemoted(punishments) {
    for (const benefit in punishments) {
      if (this[benefit]) {
        this[benefit] = punishments[benefit];
      }
      //getDemoted ({salary: 8000, department: 'hr'});
    }
    console.log(this);
    console.log('Damn!');
  }

  //   Class members:
  // - properties:

  // •	EMPLOYEES: static readonly property where each user gets registered on initialization (contains list of all instances, except intentionally deleted once).
  // - methods:

}




class Manager extends Employee {
  constructor(person) {
    super(person);
    this.position = 'manager'
  }

  get managedEmployees() {
    return Employee.EMPLOYEES.filter(element => element.department === this.department && element.position !== 'manager');
  }

  // Implementation Details:
  // inherits from Employee. Its constructor does not require position property, 
  // it should always be initialized as ‘manager’.
  // Class members:
  // - properties:
  // •	managedEmployees: readonly, selects all instances that belong to his/her department 
  // that are not managers.

}

class BlueCollarWorker extends Employee {
  // Implementation Details:
  // inherits from Employee, no special logic applied here.
}




class HRManager extends Manager {
  constructor(person) {
    super(person);
    this.department = 'hr'
  }

  //  Implementation Details:
  //  inherits from Manager. Its constructor does not require department property, 
  //  it should always be initialized as ‘hr’.

}

class SalesManager extends Manager {
  constructor(person) {
    super(person);
    this.department = 'sales'
  }

  //  inherits from Manager. Its constructor does not require department property, 
  //  it should always be initialized as ‘sales’.
}

const special = {
  promote(employee) {
    if (this.managedEmployees.includes(employee)) {
      employee.position = 'manager';
      console.log(employee);
      console.log(this.managedEmployees);
    }
  }
}

function ManagerPro(manager) {
  //console.log(manager);
  Object.assign(manager, special)
}
/*
You’ll need to implement composition:
Implementation Details:
create a function ManagerPro that takes a manager instance and upgrades it 
(i.e gives him/her an ability to promote managedEmployees),
 you are free to add other abilities besides promotion as well.

*/

const blueCollarWorkerOne = new BlueCollarWorker({
  id: 3,
  firstName: 'Mary',
  lastName: 'Doe',
  birthday: '10/04/1994',
  salary: 5000,
  position: 'office worker',
  department: 'sales'
});

const blueCollarWorkerTwo = new BlueCollarWorker({
  id: 4,
  firstName: 'Jane',
  lastName: 'Doe',
  birthday: '10/04/1994',
  salary: 6000,
  position: 'office worker',
  department: 'hr'
});

const blueCollarWorkerThree = new BlueCollarWorker({
  id: 5,
  firstName: 'Bobby',
  lastName: 'DoeDoe',
  birthday: '10/04/1984',
  salary: 7000,
  position: 'office worker',
  department: 'hr'
});

const tester = new BlueCollarWorker({
  id: 6,
  firstName: 'Tester',
  lastName: 'Testeroni',
  birthday: '11/11/2011',
  salary: 1000,
  position: 'office worker',
  department: 'sales'
});

const hrManager = new HRManager({
  id: 7,
  firstName: 'hrManager',
  lastName: 'hrManageroni',
  birthday: '10/10/2010',
  salary: 12000
});

const salesManager = new SalesManager({
  id: 8,
  firstName: 'salesManager',
  lastName: 'salesManageroni',
  birthday: '09/09/2009',
  salary: 12000
});

ManagerPro(hrManager);