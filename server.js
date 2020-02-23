var inquirer = require("inquirer");
var cTable = require("console.table");
var orm = require("./config/orm")

openingCredits();

function openingCredits(){
console.log( 
`\n\n         ______     __    __     ______   __         ______     __  __     ______     ______    
        /\\  ___\\   /\\ "-./  \\   /\\  == \\ /\\ \\       /\\  __ \\   /\\ \\_\\ \\   /\\  ___\\   /\\  ___\\   
        \\ \\  __\\   \\ \\ \\-./\\ \\  \\ \\  _-/ \\ \\ \\____  \\ \\ \\/\\ \\  \\ \\____ \\  \\ \\  __\\   \\ \\  __\\   
         \\ \\_____\\  \\ \\_\\ \\ \\_\\  \\ \\_\\    \\ \\_____\\  \\ \\_____\\  \\/\\_____\\  \\ \\_____\\  \\ \\_____\\ 
          \\/_____/   \\/_/  \\/_/   \\/_/     \\/_____/   \\/_____/   \\/_____/   \\/_____/   \\/_____/ `)
console.log(
` __    __     ______     __   __     ______     ______     ______     __    __     ______     __   __     ______  
/\\ "-./  \\   /\\  __ \\   /\\ "-.\\ \\   /\\  __ \\   /\\  ___\\   /\\  ___\\   /\\ "-./  \\   /\\  ___\\   /\\ "-.\\ \\   /\\__  _\\ 
\\ \\ \\-./\\ \\  \\ \\  __ \\  \\ \\ \\-.  \\  \\ \\  __ \\  \\ \\ \\__ \\  \\ \\  __\\   \\ \\ \\-./\\ \\  \\ \\  __\\   \\ \\ \\-.  \\  \\/_/\\ \\/ 
 \\ \\_\\ \\ \\_\\  \\ \\_\\ \\_\\  \\ \\_\\\\"\\_\\  \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_____\\  \\ \\_\\ \\ \\_\\  \\ \\_____\\  \\ \\_\\\\"\\_\\    \\ \\_\\ 
  \\/_/  \\/_/   \\/_/\\/_/   \\/_/ \\/_/   \\/_/\\/_/   \\/_____/   \\/_____/   \\/_/  \\/_/   \\/_____/   \\/_/ \\/_/     \\/_/ \n\n`)

prompt();
};

function prompt() {
    //this tool too long... 
//     console.log( 
// `\n\n         ______     __    __     ______   __         ______     __  __     ______     ______    
//         /\\  ___\\   /\\ "-./  \\   /\\  == \\ /\\ \\       /\\  __ \\   /\\ \\_\\ \\   /\\  ___\\   /\\  ___\\   
//         \\ \\  __\\   \\ \\ \\-./\\ \\  \\ \\  _-/ \\ \\ \\____  \\ \\ \\/\\ \\  \\ \\____ \\  \\ \\  __\\   \\ \\  __\\   
//          \\ \\_____\\  \\ \\_\\ \\ \\_\\  \\ \\_\\    \\ \\_____\\  \\ \\_____\\  \\/\\_____\\  \\ \\_____\\  \\ \\_____\\ 
//           \\/_____/   \\/_/  \\/_/   \\/_/     \\/_____/   \\/_____/   \\/_____/   \\/_____/   \\/_____/ `)
//     console.log(
// ` __    __     ______     __   __     ______     ______     ______     __    __     ______     __   __     ______  
// /\\ "-./  \\   /\\  __ \\   /\\ "-.\\ \\   /\\  __ \\   /\\  ___\\   /\\  ___\\   /\\ "-./  \\   /\\  ___\\   /\\ "-.\\ \\   /\\__  _\\ 
// \\ \\ \\-./\\ \\  \\ \\  __ \\  \\ \\ \\-.  \\  \\ \\  __ \\  \\ \\ \\__ \\  \\ \\  __\\   \\ \\ \\-./\\ \\  \\ \\  __\\   \\ \\ \\-.  \\  \\/_/\\ \\/ 
//  \\ \\_\\ \\ \\_\\  \\ \\_\\ \\_\\  \\ \\_\\\\"\\_\\  \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_____\\  \\ \\_\\ \\ \\_\\  \\ \\_____\\  \\ \\_\\\\"\\_\\    \\ \\_\\ 
//   \\/_/  \\/_/   \\/_/\\/_/   \\/_/ \\/_/   \\/_/\\/_/   \\/_____/   \\/_____/   \\/_/  \\/_/   \\/_____/   \\/_/ \\/_/     \\/_/ \n\n`)
  //ok,time for actual coding
    inquirer.prompt([
      {
        type: "list",
        name: "selection",
        message: "Select Action",
        choices: ["View All Employees", "View All Managers", "View Employees By Manager", "View Roles", "View Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Manager", "Remove Employee", "Remove Role", "Remove Department"]
      }
    ]) .then(answers => {
        console.log(answers.selection);
        
        if (answers.selection === "View All Employees") { 
            //My testing section
            // orm.rolesList(function(result) {
            //     const table = cTable.getTable(result)
            //     console.log(table);
            //     anotherAction();
            //   });    
            // end of test section
            orm.selectEmployees(function(result) {
              const table = cTable.getTable(result)
              console.log(table);
              anotherAction();
            });     
        }
        else if (answers.selection === "View All Managers") {        
            orm.selectManagers(function(result) {
              const table = cTable.getTable(result)
              console.log(table);
              anotherAction();
            });     
        }  
        else if (answers.selection === "View Employees By Manager") {
            orm.managerList(function(result) {
            var managersForLater = result;  
            inquirer.prompt([
                {
                type: "list",
                name: "selection",
                message: "Select a Manager",
                choices: managersForLater
                }
            ]).then(answers => {  
                console.log(answers);
                orm.managers_underlings(answers.selection, function(result) {
                    console.table(result);
                    anotherAction();
                });
            });
        });
      }
      else if (answers.selection === "View Roles") {
        orm.selectRoles(function(result) {
          console.table(result);
          anotherAction();
        });
      }
      else if (answers.selection === "View Departments") {
        orm.selectDepartments(function(result) {
          console.table(result);
          anotherAction();
        });
      }
      else if (answers.selection === "Add Employee") {
        orm.managerList(function(result) {
        var managersForLater = result;
        orm.rolesList(function(result) {
        var rolesForLater = result;
        orm.departmentList(function(result) {
        var departmentsForLater = result;
        // console.log(rolesForLater)   
        inquirer.prompt([
            {
              type: "input",
              name: "fname",
              message: "Employee First Name",
            },
            {
              type: "input",
              name: "lname",
              message: "Employee Last Name",
            },
            {
              type: "list",
              name: "role",
              message: "Choose your role",
              choices: rolesForLater
            },
            {
              type: "list",
              name: "dept",
              message: "Choose your department",
              choices: departmentsForLater
            },
            {
              type: "list",
              name: "manager",
              message: "Choose your manager",
              choices: managersForLater
            }
          ]).then(answers => {
            console.log(answers);
            orm.addEmployee(answers.fname, answers.lname, answers.role, answers.dept, answers.manager, function(result) {
                if (err) throw err;
                console.log(result.affectedRows + " item updated\n");
                anotherAction();
            });
                });
        });
            });
          });
      }
      else if (answers.selection === "Add Role") {
        inquirer.prompt([
            {
              type: "input",
              name: "title",
              message: "Role Title",
            },
            {
              type: "input",
              name: "salary",
              message: "Role Salary",
            },
            {
              type: "input",
              name: "department",
              message: "Role Department",
            }
          ]).then(answers => {
            console.log(answers);
            connection.query(
              "INSERT INTO role (title, salary, department) VALUES (?, ?, ?)", 
            [
              answers.title, 
              answers.salary, 
              answers.department, 
            ],
              function(err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " item updated\n");
                anotherAction();
            });
          });
      }
      else if (answers.selection === "Add Department") {
        inquirer.prompt([
            {
              type: "input",
              name: "name",
              message: "Department Name",
            },
          ]).then(answers => {
            console.log(answers);
            connection.query(
              "INSERT INTO department (name) VALUES (?)", 
            [
              answers.name, 
            ],
              function(err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " item updated\n");
                anotherAction();
            });
          });
      }
      else if (answers.selection === "Update Employee Manager") {
        inquirer.prompt([
            {
              type: "input",
              name: "id",
              message: "Employee ID Number",
            },
            {
              type: "input",
              name: "manager",
              message: "New Manager",
            }
          ]).then(answers => {
            console.log(answers);
            connection.query( 
              "UPDATE employee SET manager_id (SELECT id FROM employee WHERE CONCAT(first_name,' ',last_name) = ?) WHERE id = ?", 
            [
              answers.manager,
              parseInt(answers.id),
            ],
              function(err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " item updated\n");
                anotherAction();
            });
          });
      }
      else if (answers.selection === "Remove Employee") {
        inquirer.prompt([
            {
              type: "input",
              name: "id",
              message: "Employee ID Number",
            },
          ]).then(answers => {
            console.log(answers);
            connection.query( 
              "DELETE FROM employee WHERE id = ?", 
            [
              parseInt(answers.id),
            ],
              function(err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " item updated\n");
                anotherAction();
            });
          });
      }
      else if (answers.selection === "Remove Role") {
        inquirer.prompt([
            {
              type: "input",
              name: "name",
              message: "Role Name",
            },
          ]).then(answers => {
            console.log(answers);
            connection.query(
              "DELETE FROM role WHERE title = ?", 
            [
              answers.name,
            ],
              function(err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " item updated\n")
                anotherAction()
            });
          });
      }
      else if (answers.selection === "Remove Department") {
        inquirer.prompt([
            {
              type: "input",
              name: "name",
              message: "Department Name",
            },
          ]).then(answers => {
            console.log(answers);
            connection.query(
              "DELETE FROM department WHERE name = ?", 
            [
              answers.name,
            ],
              function(err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " item updated\n");
                anotherAction();
            }); 
          }); 
      };
    });
};

  function anotherAction() {
    inquirer.prompt([
          {
            type: "confirm",
            name: "another",
            message: "Would you like to complete another action?",
          },
        ]).then(answers => {
          if (!answers.another) {
            orm.getMeOuttaHere();
          } 
          else {
            prompt();
          }
        });
    };