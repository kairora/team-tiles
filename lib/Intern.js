// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const employee = require("./lib/Employee");

class Intern extends Employee {
    constructor(name, email, id, github) {
      super(name, email, id);
      this.github = github

      this.name = name;
      this.email = email;
      this.id = id;
    }
}


module.exports = Intern;