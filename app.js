const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamArr = [];


// Write code to use inquirer to gather information about the development team members, 
// and to create objects for each team member (using the correct classes as blueprints!)
function promptManager() {
    console.log("Start building your engineering team!")
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email?"
        },
        {
            type: "input",
            name: "id",
            message: "What the manager's ID?"
        },
        {
            type: "input",
            name: "office",
            message: "What is the manager's office room number?"
        },
    ])
    .then(answers => {
        const manager = new Manager(answers.name, answers.email, answers.id, answers.office)
        teamArr.push(manager)
        return promptNext()
      })
}
function promptNext() {
    return inquirer.prompt([
        {
            type: "list",
            name: "nextPerson",
            message: "Who would you like to add to your team?",
            choices: [
                "Engineer",
                "Intern",
                "No more team members.",
            ]
        },
    ]).then(answers => {
        if(answers.nextPerson === "Engineer") {
            return promptEngineer()
        } else if(answers.nextPerson === "Intern"){
            return promptIntern()
        }else {
            return
        }
       })
    
}
function promptEngineer() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Engineer's name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Engineer's email?"
        },
        {
            type: "input",
            name: "id",
            message: "What the Engineer's ID?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the Engineer's Github Username?"
        },
    ])
    .then(answers => {
        const engineer = new Engineer(answers.name, answers.email, answers.id, answers.github);
        teamArr.push(engineer)
        return promptNext()
       })
}
function promptIntern() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Intern's name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Intern's email?"
        },
        {
            type: "input",
            name: "id",
            message: "What the Intern's ID?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of the Intern's current or most recent school?"
        },
    ])
    .then(answers => {
        const intern = new Intern(answers.name, answers.email, answers.id, answers.school);
        teamArr.push(intern)
        return promptNext()
       })
}
promptManager();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
render(teamArr);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
