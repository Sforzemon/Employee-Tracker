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
    var queryString = "SELECT department.name, role.title, role.salary FROM role JOIN department ON role.department_id=department.id ORDER BY role.id ASC, role.title DESC";
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
    var queryString =
  `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,(SELECT role.id FROM role JOIN department ON role.department_id=department.id WHERE role.title = ? AND department.name = ?),(SELECT id FROM employee WHERE CONCAT(first_name,' ',last_name) = ?)`;

  // INSERT INTO employee (first_name, last_name, role_id, manager_id)
  // VALUES( ?, ?, role_id IN (SELECT id FROM role WHERE role.title = ? AND department_id=department.id WHERE department.name = ?), manager_id IN (SELECT id FROM employee WHERE CONCAT(first_name,' ',last_name) = ?))`;
  // 'INSERT INTO employee (first_name, last_name, role, department, manager) VALUES (?, ?, ?, ?, ?)';
    connection.query(queryString, [fname, lname, role, dept, manager], function(err, result) {
      if (err) throw err;
      cb(result);
    });
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