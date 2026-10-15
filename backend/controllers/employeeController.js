const Employee = require("../models/employeeModel");

// Show all employees
function getAllEmployees(req, res) {
  const employees = Employee.getEmployees();
  res.json(employees);
}

// Add employee
function createEmployee(req, res) {
  const { name, email, role } = req.body;

  if (!name?.trim() || !email?.trim() || !role?.trim()) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const employee = {
    name: name.trim(),
    email: email.trim(),
    role: role.trim()
  };

  try {
    const result = Employee.addEmployee(
      employee.name,
      employee.email,
      employee.role
    );

    res.status(201).json({
      id: result.lastInsertRowid,
      ...employee
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    res.status(500).json({
      message: "Unable to add employee"
    });
  }
}

// Edit employee
function editEmployee(req, res) {
  const id = Number(req.params.id);
  const { name, email, role } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid employee ID"
    });
  }

  if (!name?.trim() || !email?.trim() || !role?.trim()) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  try {
    const result = Employee.updateEmployee(
      id,
      name.trim(),
      email.trim(),
      role.trim()
    );

    if (result.changes === 0) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.json({
      message: "Employee updated successfully"
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    res.status(500).json({
      message: "Unable to update employee"
    });
  }
}

// Delete employee
function removeEmployee(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid employee ID"
    });
  }

  const result = Employee.deleteEmployee(id);

  if (result.changes === 0) {
    return res.status(404).json({
      message: "Employee not found"
    });
  }

  res.json({
    message: "Employee deleted successfully"
  });
}

module.exports = {
  getAllEmployees,
  createEmployee,
  editEmployee,
  removeEmployee,
}