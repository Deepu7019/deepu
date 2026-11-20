npx create-react-app employee-management
cd employee-management
npm install axios
npm install -g json-server
Inside your employee-management folder, create a new file named:
db.json

{
  "employees": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    },
    {
      "id": 2,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com"
    }
  ]
}

src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://localhost:5000/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);

  const fetchEmployees = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const saveEmployee = async (e) => {
    e.preventDefault();

    if (employee.id)
      await axios.put(`${API}/${employee.id}`, employee);
    else
      await axios.post(API, employee);

    setEmployee(null);
    await fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${API}/${id}`);
    await fetchEmployees();
  };

  return (
    <div className="container">
      <h2>Employee Management</h2>

      <button onClick={() => setEmployee({
        firstName: '',
        lastName: '',
        email: ''
      })}>
        Add Employee
      </button>

      {employee && (
        <form onSubmit={saveEmployee}>
          <input placeholder="First Name" required
            value={employee.firstName}
            onChange={e => setEmployee({
              ...employee,
              firstName: e.target.value
            })} />

          <input placeholder="Last Name" required
            value={employee.lastName}
            onChange={e => setEmployee({
              ...employee,
              lastName: e.target.value
            })} />

          <input placeholder="Email" required
            value={employee.email}
            onChange={e => setEmployee({
              ...employee,
              email: e.target.value
            })} />

          <button type="submit">Save</button>
          <button type="button"
            onClick={() => setEmployee(null)}>
            Cancel
          </button>
        </form>
      )}

      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>
                <button onClick={() => setEmployee(emp)}>
                  Edit
                </button>
                <button onClick={() => deleteEmployee(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

src/App.css 

.container {
  width: 80%;
  margin: 40px auto;
  text-align: center;
  font-family: Arial;
}

input {
  padding: 10px;
  margin: 10px;
}

button {
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
}

table {
  width: 100%;
  margin-top: 25px;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: center;
}

Terminal 1 – Start JSON Server
Make sure you are inside the employee-management folder.

 json-server --watch db.json --port 5000

Open another terminal in VS Code.
 cd employee-management
npm start
employee-management/
│
├── node_modules/
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
│
├── db.json
├── package.json
└── package-lock.json
