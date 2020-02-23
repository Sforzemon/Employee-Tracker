var connection = require("./connection")

var orm = {
  managerList: function(cb) {
    var queryString = 'SELECT CONCAT (employee.first_name, " ", employee.last_name) AS manager_names FROM employee JOIN role ON employee.role_id =role.id WHERE role.title="Manager" ORDER BY employee.id ASC';
    connection.query(queryString, function(err, result) {
      var managersForLater = []
      if (err) throw err;
      for (i=0;i<result.length;i++) {
        managersForLater.push(result[i].manager_names);
      }
      cb(managersForLater);
      //console.log (managersForLater);
    });
  },
  departmentList: function(cb) {
    var queryString = 'SELECT name FROM department';
    connection.query(queryString, function(err, result) {
      var departmentsForLater = []
      if (err) throw err;
      // console.log(result)
      for (i=0;i<result.length;i++) {
        departmentsForLater.push(result[i].name);
      }
      cb(departmentsForLater);
      // console.log (departmentsForLater);
    });
  },
  rolesList: function(cb) {
    var queryString = 'SELECT DISTINCT title FROM role';
    connection.query(queryString, function(err, result) {
      var rolesForLater = []
      if (err) throw err;
      // console.log(result)
      for (i=0;i<result.length;i++) {
        rolesForLater.push(result[i].title);
      }
      cb(rolesForLater);
      // console.log (rolesForLater);
    });
  },
  selectEmployees: function(cb) {
    var queryString = "SELECT employee.id, CONCAT (employee.first_name, ' ', employee.last_name) AS employee_name, role.title, role.salary, department.name AS department FROM employee JOIN role ON employee.role_id =role.id JOIN department ON role.department_id=department.id ORDER BY id ASC";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  selectManagers: function(cb) {
    var queryString = 'SELECT CONCAT (employee.first_name, " ", employee.last_name) AS manager_names FROM employee JOIN role ON employee.role_id =role.id WHERE role.title="Manager" ORDER BY employee.id ASC';
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  managers_underlings: function(manager_name, cb) {
    var queryString = "SELECT CONCAT (first_name, ' ', last_name) AS managers_underlings FROM employee WHERE manager_id IN (SELECT id FROM employee WHERE CONCAT(first_name,' ',last_name) = ?)";
    connection.query(queryString, manager_name,function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  selectRoles: function(cb) {
    var queryString = "SELECT department.name AS department, role.title, role.salary FROM role JOIN department ON role.department_id=department.id ORDER BY role.id ASC, role.title DESC";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  selectDepartments: function(cb) {
    var queryString = "SELECT * FROM department";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  addEmployee: function(fname, lname, role, dept, manager, cb) {
    console.log(fname,lname,role,dept,manager)
    var queryString = "SELECT role.id FROM role JOIN department ON role.department_id=department.id WHERE role.title = ? AND department.name = ?";
    connection.query(queryString, [role, dept], function(err, role) {
      console.log(role[0].id);
      if(err) throw err;

    var queryString = "SELECT id FROM employee WHERE CONCAT(first_name,' ',last_name) = ?";
    connection.query(queryString, [manager], function(err, manID) {
      console.log(manID[0].id);
      if(err) throw err;
     
    var queryString = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    connection.query(queryString, [fname, lname, role[0].id, manID[0].id], function(err, result){
      if(err) throw err;
      cb(result);
    });
    });
  });

  //   var queryString =
  // `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,(SELECT role.id FROM role JOIN department ON role.department_id=department.id WHERE role.title = ? AND department.name = ?),(SELECT id FROM employee WHERE CONCAT(first_name,' ',last_name) = ?)`;

  // // INSERT INTO employee (first_name, last_name, role_id, manager_id)
  // // VALUES( ?, ?, role_id IN (SELECT id FROM role WHERE role.title = ? AND department_id=department.id WHERE department.name = ?), manager_id IN (SELECT id FROM employee WHERE CONCAT(first_name,' ',last_name) = ?))`;
  // // 'INSERT INTO employee (first_name, last_name, role, department, manager) VALUES (?, ?, ?, ?, ?)';
  //   connection.query(queryString, [fname, lname, role, dept, manager], function(err, result) {
  //     if (err) throw err;
  //     cb(result);
    //});
  },
  addRole: function(title, salary, dept, cb) {
    var queryString = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,(SELECT id FROM department WHERE name = ?))';
    connection.query(queryString, [title, salary, dept], function(err, result) {
      if (err) throw err;
      cb(result);
    })
  },
  addDepartment: function(name, cb) {
    var queryString = 'INSERT INTO department (name) VALUES (?)';
    connection.query(queryString, name, function(err, result) {
      if (err) throw err;
      cb(result);
    })
  },
  updateManager: function(empID, manager, cb) {
    var queryString = 'SELECT id FROM employee WHERE CONCAT(first_name, " ",last_name) = ?';
    connection.query(queryString, [manager], function(err, result) {
      if (err) throw err;
      var queryString = "UPDATE employee SET manager_id = ? WHERE employee.id = ?";
      // console.log(result);
      // console.log(result.id);
      // console.log(result[0].id);

      connection.query(queryString,[result[0].id,empID],function(err,result) {
        if (err) throw err;
        cb(result);
      });
    });
  },
  deleteEmployee: function(empID, cb) {
    var queryString = 'DELETE FROM employee WHERE id = ?';
    connection.query(queryString, empID, function(err, result) {
      if (err) throw err;
      cb(result);
    })
  },
  removeRole: function(role, cb) {
    var queryString = 'DELETE FROM role WHERE title = ?';
    connection.query(queryString, role, function(err, result) {
      if (err) throw err;
      cb(result);
    })
  },
  removeDepartment: function(dept, cb) {
    var queryString = 'DELETE FROM department WHERE name = ?';
    connection.query(queryString, dept, function(err, result) {
      if (err) throw err;
      cb(result);
    })
  },
  getMeOuttaHere: function() {
    console.log(`\n\n ______   ______   ______   _____    ______  __    _   ______ 
| | ____ / |  | \\ / |  | \\ | | \\ \\  | |  | \\ \\ \\  | | | |     
| |  | | | |  | | | |  | | | |  | | | |--| <  \\_\\_| | | |---- 
|_|__|_| \\_|__|_/ \\_|__|_/ |_|_/_/  |_|__|_/  ____|_| |_|____ \n\n`);
      connection.end();
    }
  };

module.exports = orm;