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

const asyncFileWriter = util.promisify(fs.writeFile);


// email validation regex taken from https://ui.dev/validate-email-address-javascript/
// 
function promptManager() {
    console.log("Start building your engineering team!")
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?",
            validate: input => {
                if(input !== "") {
                    return true;
                } else {
                    return "Please input the manager's full name."
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email?",
            validate: input => {
                const valEmail = input.match(/\S+@\S+\.\S+/);
                if(valEmail) {
                    return true;
                } else {
                    return "Please input a valid email."
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "What the manager's ID?", 
            validate: input => {
                const valID = input.match(/[a-zA-Z0-9]$/);
                if(valID) {
                    return true;
                } else {
                    return "Please input a valid employee ID."
                }
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office room number?",
            validate: input => {
                const valOffice = input.match(/^[1-9]\d*$/);
                if(valOffice) {
                    return true;
                } else {
                    return "Please input a valid room number."
                }
            }
            
        },
    ])
    .then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
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
                "No more team members."
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
            message: "What is the Engineer's name?",
            validate: input => {
                if(input !== "") {
                    return true;
                } else {
                    return "Please input the Engineer's full name."
                }
            }

        },
        {
            type: "input",
            name: "email",
            message: "What is the Engineer's email?",
            validate: input => {
                const valEmail = input.match(/\S+@\S+\.\S+/);
                if(valEmail) {
                    return true;
                } else {
                    return "Please input a valid email."
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "What the Engineer's ID?",
            validate: input => {
                const valID = input.match(/[a-zA-Z0-9]$/);
                if(valID) {
                    return true;
                } else {
                    return "Please input a valid employee ID."
                }
            }

        },
        // username must be alphanumeric and 3-16 characters in length, may have an underscore.
        { 
            type: "input",
            name: "github",
            message: "What is the Engineer's Github Username?",
            validate: input => {
                const valGithub = input.match(/^[a-z0-9_-]{3,16}$/);
                if(valGithub) {
                    return true;
                } else {
                    return "Please input a valid Github username."
                }
            }
        },
    ])
    .then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamArr.push(engineer)
        return promptNext()
       })
}
function promptIntern() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Intern's name?",
            validate: input => {
                if(input !== "") {
                    return true;
                } else {
                    return "Please input the Intern's full name."
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is the Intern's email?",
            validate: input => {
                const valEmail = input.match(/\S+@\S+\.\S+/);
                if(valEmail) {
                    return true;
                } else {
                    return "Please input a valid email."
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "What the Intern's ID?",
            validate: input => {
                const valID = input.match(/[a-zA-Z0-9]$/);
                if(valID) {
                    return true;
                } else {
                    return "Please input a valid employee ID."
                }
            }
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of the Intern's current or most recent school?",
            validate: input => {
                if(input !== "") {
                    return true;
                } else {
                    return "Please input a valid university name."
                }
            }
        },
    ])
    .then(answers => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamArr.push(intern)
        return promptNext()
       })
}

async function startAll() {
    try {
        const answers = await promptManager();
        const newTeam = render(teamArr);
        await asyncFileWriter(outputPath, newTeam);
        console.log("Team is created!");
    } catch (err) {
        console.log(err);
    }
}
startAll();


