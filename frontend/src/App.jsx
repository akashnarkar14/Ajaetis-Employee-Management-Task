import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/employees";

const emptyForm = {
  name: "",
  email: "",
  role: "",
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // Fetch employees from the backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API);
      setEmployees(response.data);
      setError("");
    } catch {
      setError("Cannot connect to backend. Check if it is running.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add or update employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingId !== null) {
        await axios.put(`${API}/${editingId}`, form);
      } else {
        await axios.post(API, form);
      }

      setForm(emptyForm);
      setEditingId(null);
      await fetchEmployees();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to save employee"
      );
    }
  };

  // Load employee into the form
  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setForm({
      name: employee.name,
      email: employee.email,
      role: employee.role,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);

      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForm);
      }

      await fetchEmployees();
    } catch {
      setError("Unable to delete employee");
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Ajaetis Employee Management</h1>
          <p className="subtitle">
            Manage your employees in one place.
          </p>
        </div>

        <div className="count">
          <strong>{employees.length}</strong>
          <span>Total Employees</span>
        </div>
      </header>

      <section className="panel">
        <h2>{editingId !== null ? "Edit Employee" : "Add Employee"}</h2>

        <form className="employee-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              placeholder="Enter full name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </label>

          <label>
            Job Role
            <input
              type="text"
              placeholder="e.g. Software Developer"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              required
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="primary">
              {editingId !== null ? "Save Changes" : "+ Add Employee"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {error && <p className="error">{error}</p>}
      </section>

      <section className="panel">
        <div className="directory-header">
          <div>
            <h2>All Employees</h2>
            <p className="subtitle">View and manage employee records.</p>
          </div>

          <input
            className="search"
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>
                    <span className="role">{employee.role}</span>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        className="edit"
                        onClick={() => handleEdit(employee)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer>Employee Directory · React JS + Node.js + SQLite</footer>
    </div>
  );
}

export default App;
