const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "employees.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log("Database ready:", dbPath);

module.exports = db;