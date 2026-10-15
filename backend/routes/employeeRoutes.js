const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.getAllEmployees);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.editEmployee);
router.delete("/:id", employeeController.removeEmployee);

module.exports = router;