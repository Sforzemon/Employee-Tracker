var inquirer = require("inquirer");
var mysql = require("mysql");
var express = require("express")
var cTable = require("console.table");
var password = require("./password");

var app = express();

var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: password,
  database: "employee_trackerDB"
});

function prompt() {
    inquirer.prompt([
      {
        type: "list",
        name: "selection",
        message: "Select Action",
        choices: ["View All Employees", "View Employees By Manager", "View Roles", "View Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Manager", "Remove Employee", "Remove Role", "Remove Department"]
      }
    ]) .then(answers => {
      console.log(answers.selection);
      if (answers.selection === "View All Employees") {        
            connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee JOIN role ON employee.role_id =role.id JOIN department ON role.department_id=department.id ORDER BY id ASC", function(err, result) {
              const table = cTable.getTable(result)
              console.log(table);
              anotherAction();
            });
      } 
      else if (answers.selection === "View Employees By Manager") {
        inquirer.prompt([
            {
              type: "list",
              name: "selection",
              message: "Select a Manager",
              choices: ["Walt Disney", "Scrooge McDuck", "Mickey Mouse", "Goofy Goof", "Chip Squirrel", "Dale Squirrel"]
            }
            //FIX THIS!!!!!!
          ]).then(answers => {
            console.log(answers);
            connection.query("SELECT CONCAT (first_name, ' ', last_name) AS managers_underlings FROM employee WHERE manager_id IN (SELECT id FROM employee WHERE CONCAT(first_name,' ',last_name) = ?)", 
            [
              answers.selection
            ],
            function(err, result) {
              console.table(result);
              anotherAction();
            });
          });
      }
      else if (answers.selection === "View Roles") {
        connection.query("SELECT  department.name, role.title, role.salary FROM role JOIN department ON role.department_id=department.id", function(err, result) {
          console.table(result);
          anotherAction();
        });
      }
      else if (answers.selection === "View Departments") {
        connection.query("SELECT * FROM department", function(err, result) {
          console.table(result);
          anotherAction();
        });
      }
      else if (answers.selection === "Add Employee") {
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
              type: "input",
              name: "role",
              message: "Employee Job Title",
            },
            {
              type: "input",
              name: "department",
              message: "Employee Department",
            },
            {
              type: "list",
              name: "manager",
              message: "Employee Manager",
            }
          ]).then(answers => {
            console.log(answers);
            connection.query(
                "INSERT INTO employee (first_name, last_name, role, department, manager) VALUES (?, ?, ?, ?, ?)", 
            [
              answers.fname, 
              answers.lname,
              answers.role, 
              answers.department, 
              answers.manager
            ],
              function(err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " item updated\n");
                anotherAction();
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
            connection.end()
            console.log("Thank you, come again. Hopefully you didn't ruin my database.")
          } 
          else {
            prompt();
          }
        });
    };

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    prompt();
});

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });