// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const employee = require("./lib/Employee");

class Manager extends Employee {
    constructor(name, email, id, officeNumber) {
      super(name, email, id);
      this.officeNumber = officeNumber

      this.name = name;
      this.email = email;
      this.id = id;
    }
    getRole() {
        return Manager;
    }
}


module.exports = Manager;