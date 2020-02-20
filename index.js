var inquirer = required("inquirer");
var mysql = required("mysql");
var consoleTable = required("console.table");
var password = required("./Passwords/password");

var app = express();

var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: password,
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});







app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });