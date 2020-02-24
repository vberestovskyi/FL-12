class Employee {
  static get EMPLOYEES() {
    if (!this._EMPLOYEES) {
      this._EMPLOYEES = [];
    }
    return this._EMPLOYEES;
  }
  constructor(person) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.birthday = person.birthday;
    this.salary = person.salary;
    this.position = person.position;
    this.department = person.department;
    Employee.EMPLOYEES.push(this);
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
  get age() {
    const delta = Date.now() - new Date(this.birthday).getTime();
    return parseInt(String(delta / (1000 * 60 * 60 * 24 * 365)), 10);
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
    Employee.EMPLOYEES.splice(Employee.EMPLOYEES.indexOf(this), 1);
  }
  retire() {
    this.quit();
    console.log('It was such a pleasure to work with you!');
  }
  getFired() {
    this.quit();
    console.log('Not a big deal!');
  }
  getPromoted(benefits) {
    for (const key in benefits) {
      if (this.hasOwnProperty.call(benefits, key)) {
        this[key] = benefits[key];
      }
    }
    console.log('Yoohooo!');
  }
  getDemoted(punishment) {
    for (const key in punishment) {
      if (this.hasOwnProperty.call(punishment, key)) {
        this[key] = punishment[key];
      }
    }
    console.log('Damn!');
  }
}

class Manager extends Employee {
  constructor(person) {
    super(person);
    this.position = 'manager'
  }
  get managedEmployees() {
    return Employee.EMPLOYEES.filter(
      element => element.department === this.department && element.position !== 'manager');
  }
}

class BlueCollarWorker extends Employee {
  //inherits from Employee, no special logic applied here
}

class HRManager extends Manager {
  constructor(person) {
    super(person);
    this.department = 'hr'
  }
}

class SalesManager extends Manager {
  constructor(person) {
    super(person);
    this.department = 'sales'
  }
}

//* Task 3

const promoter = {
  promote(id, value) {
    const employee = this.managedEmployees.find(employee => employee.id === id);
    if (employee) {
      employee.getPromoted({ salary: value });
    }
  },
  demote(id, value) {
    const employee = this.managedEmployees.find(employee => employee.id === id);
    if (employee) {
      employee.getDemoted({ salary: value });
    }
  },
};
function ManagerPro(manager, promoter) {
  return Object.assign(manager, promoter);
}

//! DATA FOR TESTING
/*
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

const managerPro = ManagerPro(hrManager, promoter);

managerPro.demote(5, 500);
console.log(blueCollarWorkerThree);

managerPro.promote(4, 100500);
console.log(blueCollarWorkerTwo);
*/