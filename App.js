Program 9 – Employee Management using React, GraphQL & Vite 
Step 1. Folder structure
Create a folder Program_9 and open it in VS Code.
Program_9/
│
├── server/
│   ├── index.js
│   └── package.json
│
└── client/
    ├── index.html
    ├── package.json
    │
    └── src/
        ├── App.jsx
        └── main.jsx



PART A — BACKEND (GRAPHQL)
Step 2. Create the server
Open the terminal inside Program_9:
mkdir server
cd server
npm init -y


Step 3. Install dependencies
npm install @apollo/server graphql express cors @as-integrations/express5


Step 4. Create server/index.js
Paste the following complete code:

const express = require('express');
const cors = require('cors');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');

const app = express();
const port = 3000;

// Employee data
let employees = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com'
  }
];

// GraphQL Schema
const typeDefs = `#graphql
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(firstName: String!, lastName: String!, email: String!): Employee
    updateEmployee(id: ID!, firstName: String!, lastName: String!, email: String!): Employee
    deleteEmployee(id: ID!): String
  }
`;

// Resolvers
const resolvers = {
  Query: {
    employees: () => employees,

    employee: (_, { id }) =>
      employees.find(emp => emp.id === id)
  },

  Mutation: {
    addEmployee: (_, { firstName, lastName, email }) => {
      const newId = employees.length
        ? String(Math.max(...employees.map(emp => Number(emp.id))) + 1)
        : '1';

      const newEmployee = {
        id: newId,
        firstName,
        lastName,
        email
      };

      employees.push(newEmployee);
      return newEmployee;
    },

    updateEmployee: (_, { id, firstName, lastName, email }) => {
      const employee = employees.find(emp => emp.id === id);

      if (!employee) {
        return null;
      }

      employee.firstName = firstName;
      employee.lastName = lastName;
      employee.email = email;

      return employee;
    },

    deleteEmployee: (_, { id }) => {
      const exists = employees.some(emp => emp.id === id);

      employees = employees.filter(emp => emp.id !== id);

      return exists
        ? 'Employee deleted successfully'
        : 'Employee not found';
    }
  }
};

// Start Apollo Server
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
  });
}

startServer();



Step 5. Start the backend
Inside the server folder:
node index.js


Output:
Server running at http://localhost:3000
GraphQL endpoint: http://localhost:3000/graphql


Keep the terminal open.

PART B — TEST BACKEND USING APOLLO SANDBOX
Step 6. Open Apollo Sandbox
Open:
Apollo SandboxSet the connection URL to:
http://localhost:3000/graphql


Click Connect.
Step 7. Display all employees
query {
  employees {
    id
    firstName
    lastName
    email
  }
}


Step 8. Add employee
mutation {
  addEmployee(
    firstName: "Alice"
    lastName: "Brown"
    email: "alice@example.com"
  ) {
    id
    firstName
    lastName
    email
  }
}


Step 9. Update employee
mutation {
  updateEmployee(
    id: "1"
    firstName: "John"
    lastName: "Doe"
    email: "john.updated@example.com"
  ) {
    id
    firstName
    lastName
    email
  }
}


Step 10. Delete employee
mutation {
  deleteEmployee(id: "2")
}



PART C — FRONTEND (REACT USING VITE)
Step 11. Create the React application
Open a new terminal at Program_9. Keep the backend terminal running.
npm create vite@latest client -- --template react


If prompted, select:
- Framework: OSlint
- npm run and start: no
Then run:
cd client
npm install


Step 12. Replace src/App.jsx
Open client/src/App.jsx, delete everything and paste:

import { useEffect, useState } from 'react';

const API = 'http://localhost:3000/graphql';

function App() {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [editId, setEditId] = useState(null);

  // GraphQL request function
  async function request(query, variables = {}) {
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data;
  }

  // Fetch all employees
  async function fetchEmployees() {
    try {
      const data = await request(`
        query {
          employees {
            id
            firstName
            lastName
            email
          }
        }
      `);

      setEmployees(data.employees);
    } catch (error) {
      alert('Unable to fetch employees. Check the backend server.');
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle input
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  // Add or update employee
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editId !== null) {
        await request(`
          mutation UpdateEmployee(
            $id: ID!
            $firstName: String!
            $lastName: String!
            $email: String!
          ) {
            updateEmployee(
              id: $id
              firstName: $firstName
              lastName: $lastName
              email: $email
            ) {
              id
              firstName
              lastName
              email
            }
          }
        `, {
          id: editId,
          ...form
        });

        alert('Employee updated successfully');
      } else {
        await request(`
          mutation AddEmployee(
            $firstName: String!
            $lastName: String!
            $email: String!
          ) {
            addEmployee(
              firstName: $firstName
              lastName: $lastName
              email: $email
            ) {
              id
              firstName
              lastName
              email
            }
          }
        `, form);

        alert('Employee added successfully');
      }

      setForm({
        firstName: '',
        lastName: '',
        email: ''
      });

      setEditId(null);
      await fetchEmployees();

    } catch (error) {
      alert(error.message);
    }
  }

  // Edit employee
  function handleEdit(employee) {
    setEditId(employee.id);

    setForm({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email
    });
  }

  // Delete employee
  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      await request(`
        mutation DeleteEmployee($id: ID!) {
          deleteEmployee(id: $id)
        }
      `, { id });

      alert('Employee deleted successfully');
      await fetchEmployees();

    } catch (error) {
      alert(error.message);
    }
  }

  // Cancel editing
  function handleCancel() {
    setEditId(null);

    setForm({
      firstName: '',
      lastName: '',
      email: ''
    });
  }

  return (
    <div>

      <h1>Employee Management System</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId !== null ? 'Update Employee' : 'Add Employee'}
        </button>

        {editId !== null && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}

      </form>

      <h2>Employee List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>

              <td>
                <button onClick={() => handleEdit(employee)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(employee.id)}>
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




Step 13. Replace src/main.jsx
Open client/src/main.jsx, delete the existing code and paste:

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



Step 14. Check index.html
Keep the default Vite client/index.html. It should load src/main.jsx.

No CSS files are required for this program. You do not need to edit App.css or index.css.

PART D — RUN THE PROGRAM
Step 15. Start the backend
Terminal 1 – Backend
cd Program_9/server
node index.js


Keep it running.
Step 16. Start the frontend
Open a second terminal.

Terminal 2 – Frontend
cd Program_9/client
npm run dev


Vite will display:
Local: http://localhost:5173/


Open the displayed URL in your browser.

PART E — VERIFY CRUD OPERATIONS
Step 17. Test from the frontend
Operation	Action
Create	Enter details → Add Employee
Read	View employees in the table
Update	Edit → modify details → Update Employee
Delete	Delete → Confirm

Step 18. Verify backend data
Open Apollo Sandbox and connect to:
http://localhost:3000/graphql


Run:
query {
  employees {
    id
    firstName
    lastName
    email
  }
}


You will see the same employee data that was modified through React.
