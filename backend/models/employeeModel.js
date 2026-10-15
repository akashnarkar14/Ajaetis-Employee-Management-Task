const db = require("../db");

// Get all employees
function getEmployees() {
  return db.prepare("SELECT * FROM employees").all();
}

// Add employee
function addEmployee(name, email, role) {
  return db.prepare(
    "INSERT INTO employees (name, email, role) VALUES (?, ?, ?)"
  ).run(name, email, role);
}

// Update employee
function updateEmployee(id, name, email, role) {
  return db.prepare(
    "UPDATE employees SET name = ?, email = ?, role = ? WHERE id = ?"
  ).run(name, email, role, id);
}

// Delete employee
function deleteEmployee(id) {
  return db.prepare(
    "DELETE FROM employees WHERE id = ?"
  ).run(id);
}

module.exports = {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
};