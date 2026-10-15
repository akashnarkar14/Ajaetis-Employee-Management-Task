const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Employee routes
app.use("/employees", employeeRoutes);

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});