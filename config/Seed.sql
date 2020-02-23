USE employee_trackerDB;

INSERT INTO department (name) VALUES ("Administration");
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Inventory");
INSERT INTO department (name) VALUES ("Customer Service");

INSERT INTO role (title, salary, department_id) VALUES ("Manager", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Agent", 70000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Agent", 60000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Agent", 50000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Agent", 40000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Manager", 80000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Manager", 70000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Manager", 60000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Manager", 50000, 5);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Walt", "Disney", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Scrooge", "McDuck", 6, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Donald", "Duck", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Daisy", "Duck", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mickey", "Mouse", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Minnie", "Mouse", 3, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pluto", "the dog", 3, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Goofy", "Goof", 8, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Max", "Goof", 4, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pete", "Junior", 4, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Bobby", "Zimmeruski", 4, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Chip", "Squirrel", 9, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dale", "Squirrel", 9, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Hewey", "Duck", 5, 12);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dewey", "Duck", 5, 12);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Louie", "Duck", 5, 12);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Timon", "Meerkat", 5, 13);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pumbaa", "Warthog", 5, 13);