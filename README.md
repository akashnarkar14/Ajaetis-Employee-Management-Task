repo link: https://github.com/akashnarkar14/Ajaetis-Employee-Management-Task
Project Overview
 
The Employee Directory is a simple web application that allows users to manage employee records efficiently. Users can add, view, edit, and delete employee information through a user-friendly interface.

The application is developed using React for the frontend, Node.js for the backend, and SQLite for database storage.

✨ Features
Add Employee: Add new employee records with name, email, and job role.
View Employees: Display all employee records in a directory.
Edit Employee: Update existing employee information.
Delete Employee: Remove employee records from the directory.
Data Persistence: Store employee information in an SQLite database.
REST API: Communicate between the React frontend and Node.js backend.
Database Management: View and manage database records using a SQLite database browser.
🛠️ Technologies Used
Frontend
React.js
HTML5
CSS3
JavaScript
Axios or Fetch API for HTTP requests
Backend
Node.js
Express.js
REST API
Database
SQLite
SQLite Database Browser (DB Browser for SQLite)
Development Tools
Visual Studio Code
Node Package Manager (npm)
Git and GitHub
📂 Project Structure
employee-directory/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── database/
│   │   └── employees.db
│   ├── server.js
│   ├── db.js
│   └── package.json
│
├── .gitignore
└── README.md
Note: The folder structure may vary depending on your implementation.

🚀 Installation and Setup
Prerequisites
Make sure the following tools are installed on your system:

Node.js and npm
Visual Studio Code (or another code editor)
DB Browser for SQLite
1. Clone the Repository
git clone <repository-url>
Navigate to the project directory:

cd employee-directory
2. Set Up the Backend
Navigate to the server directory:

cd server
Install the required dependencies:

npm install
Start the backend server:

npm start
The backend server will run on the configured port, for example, http://localhost:5000.

3. Set Up the Frontend
Open a new terminal and navigate to the client directory:

cd employee-directory/client
Install the frontend dependencies:

npm install
Start the React development server:

npm run dev
http://localhost:5173.
