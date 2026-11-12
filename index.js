
use EmployeeDB
=
db.employees.insertMany([
    {
        employee_id: 101,
        name: "Sonia Rao",
        department: "Engineering",
        salary: 95000,
        hire_date: new Date("2023-01-15"),
        performance_score: 4.5,
        status: "Active"
    },
    {
        employee_id: 102,
        name: "Rajesh Kumar",
        department: "HR",
        salary: 68000,
        hire_date: new Date("2024-03-22"),
        performance_score: 4.1,
        status: "Active"
    },
    {
        employee_id: 103,
        name: "Arjun Singh",
        department: "Engineering",
        salary: 120000,
        hire_date: new Date("2022-06-01"),
        performance_score: 4.8,
        status: "Active"
    },
    {
        employee_id: 104,
        name: "Priya Mehta",
        department: "Sales",
        salary: 85000,
        hire_date: new Date("2023-11-10"),
        performance_score: 4.2,
        status: "Active"
    },
    {
        employee_id: 105,
        name: "Vikram Reddy",
        department: "Sales",
        salary: 85000,
        hire_date: new Date("2024-08-01"),
        status: "On Leave"
    }
]);

=
db.employees.find().pretty();

=
db.employees.find({
    salary: { $gt: 90000, $lte: 120000 }
});

=
db.employees.find({
    department: { $in: ["HR", "Sales"] }
});

=

db.employees.find({
    status: { $ne: "On Leave" }
});

=
db.employees.find({
    department: "Engineering",
    performance_score: { $gte: 4.5 }
});


=

db.employees.find({
    $or: [
        { department: "HR" },
        { salary: { $gt: 100000 } }
    ]
});


=

db.employees.find({
    status: "Active",
    department: { $in: ["Engineering", "Sales"] },
    hire_date: { $lt: new Date("2024-01-01") }
});

=

db.employees.countDocuments();

// ============================================
// END OF PROGRAM
//How to save and execute:
//1. Open VS Code or Notepad.
//2. Paste the complete code.
//3. Save as employee_selectors.js.
//4. Open CMD and enter mongosh.
//5. Run use EmployeeDB.
//6. Execute the commands from the file in mongosh (the use EmployeeDB line is a mongosh command, not ordinary JavaScript).
// ============================================


1. Open Docker Desktop.
2. Wait until Docker Engine is running.
3. Keep it open.

## Step 2: Open VS Code terminal

Open VS Code → Terminal → New Terminal.

Select PowerShell.

Check Docker:

```
docker --version
```

Check Docker is running:

```
docker ps
```

## Step 3: Download MongoDB image

```
docker pull mongo:latest
```
## Step 4: Check downloaded image

```
docker images
```

Expected:

```
REPOSITORY   TAG       IMAGE ID       SIZE
mongo        latest    xxxxxxxxxxxx   ...
```

## Step 5: Create MongoDB container

```
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

## Step 6: Check container

```
docker ps
```

You should see:

```
CONTAINER ID   IMAGE         STATUS       PORTS
xxxxxxxx       mongo:latest  Up           27017
```

## Step 7: Enter MongoDB Shell

```
docker exec -it mongodb mongosh
```

You should see:

```
test>
```

## Step 8: Select database

```
use company
```

Expected:

```
switched to db company
```

## Step 9: Insert employee records

```
db.employees.insertMany([
{empid:1, name:"A", dept:"D1", sal:10000, status:"P"},
{empid:2, name:"B", dept:"D1", sal:20000, status:"A"},
{empid:3, name:"C", dept:"D2", sal:30000, status:"P"},
{empid:4, name:"D", dept:"D2", sal:40000, status:"A"}
])
```

## Step 10: Execute all selector queries

1\. Comparison selector – $gt and $lt

```
db.employees.find({
sal: {$gt:10000, $lt:40000}
})
```

2\. $in selector

```
db.employees.find({
dept: {$in:["D1"]}
})
```

3\. $ne selector

```
db.employees.find({
status: {$ne:"A"}
})
```

4\. AND selector

```
db.employees.find({
dept:"D1",
sal:10000,
status:"P"
})
```

5\. $and selector

```
db.employees.find({
$and:[
{dept:"D2"},
{sal:{$gt:20000}}
]
})
```

6\. $or selector

```
db.employees.find({
$or:[
{dept:"D1"},
{sal:{$gt:30000}}
]
})
```

7\. Combined selector

```
db.employees.find({
dept:"D1",
sal:{$gt:10000},
status:"P"
})
```

## Step 11: Display all records

```
db.employees.find()
```

Expected total records: 4.

## Step 12: Exit MongoDB

```
exit
```

## Execution checklist

Program 7 progress

0/11

Step 1: Open Docker Desktop

Step 2: Check Docker version

Step 3: Pull MongoDB image

Step 4: Check Docker images

Step 5: Create MongoDB container

Step 6: Check running container

Step 7: Open mongosh

Step 8: Select company database

Step 9: Insert four employee records

Step 10: Execute all selector queries

Step 11: Display final records
=-------------------------------------------------------------------------------------------

    program4

Here is the complete Program 6 React JS code, based on your three notebook images. It includes displaying student details, adding new students and dynamically updating the table.

You can write this in one file named `App.js`.

## Program 6 – Student List and Student Add Application

### 1. Complete code – App.js

```

import React from "react";

// Initial Student List
const studlist = [
  {
    slno: 1,
    name: "stud1",
    usn: "rvce1",
    tmarks: 150
  },
  {
    slno: 2,
    name: "stud2",
    usn: "rvce2",
    tmarks: 145
  }
];

// Student Row Component
class StudentRow extends React.Component {
  render() {
    const stud = this.props.stdli;

    return (
      <tr>
        <td>{stud.slno}</td>
        <td>{stud.name}</td>
        <td>{stud.usn}</td>
        <td>{stud.tmarks}</td>
      </tr>
    );
  }
}

// Student Table Component
class StudentsTable extends React.Component {
  render() {
    const studrows = this.props.stdlist.map((studli) => (
      <StudentRow
        key={studli.slno}
        stdli={studli}
      />
    ));

    return (
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Student Name</th>
            <th>USN</th>
            <th>Total Marks</th>
          </tr>
        </thead>

        <tbody>
          {studrows}
        </tbody>
      </table>
    );
  }
}

// Student Add Submit Component
class StudentAddSubmit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      usn: "",
      tmarks: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const studli = {
      name: this.state.name,
      usn: this.state.usn,
      tmarks: this.state.tmarks
    };

    this.props.CreateStudentAdd(studli);

    this.setState({
      name: "",
      usn: "",
      tmarks: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <h3>Add Student</h3>

        <input
          type="text"
          placeholder="Student Name"
          value={this.state.name}
          onChange={(e) =>
            this.setState({ name: e.target.value })
          }
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="USN"
          value={this.state.usn}
          onChange={(e) =>
            this.setState({ usn: e.target.value })
          }
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Total Marks"
          value={this.state.tmarks}
          onChange={(e) =>
            this.setState({ tmarks: e.target.value })
          }
          required
          min="0"
        />

        <br /><br />

        <button type="submit">Add</button>

      </form>
    );
  }
}

// Main Student List Component
class StudentListTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newStudList: studlist
    };

    this.CreateStudentAdd =
      this.CreateStudentAdd.bind(this);
  }

  CreateStudentAdd(studli) {

    const studlength =
      this.state.newStudList.length + 1;

    studli.slno = studlength;

    const newstudlist1 =
      this.state.newStudList.slice();

    newstudlist1.push(studli);

    this.setState({
      newStudList: newstudlist1
    });
  }

  render() {
    return (
      <div style={{ padding: "20px" }}>

        <h2>Student Details</h2>

        <StudentsTable
          stdlist={this.state.newStudList}
        />

        <br />

        <StudentAddSubmit
          CreateStudentAdd={this.CreateStudentAdd}
        />

      </div>
    );
  }
}

// Export Component
export default StudentListTable;

```

## 2. How to execute in VS Code

Step 1: Create React project

Open VS Code terminal:

```
npm create vite@latest student-app -- --template react
```

Step 2: Open project

```
cd student-app
npm install
```

Step 3: Open `src/App.jsx`

- Delete the existing code.
- Paste the complete code given above.
- Save the file.

Step 4: Run the application

```
npm run dev
```

Step 5: Open browser

Open the localhost address displayed in your terminal, usually:

```
http://localhost:5173
```

## 3. Expected output

# Student Details

| Sl No | Student Name | USN   | Total Marks |
| ----- | ------------ | ----- | ----------- |
| 1     | stud1        | rvce1 | 150         |
| 2     | stud2        | rvce2 | 145         |

Add Student

Student Name

USN

Total Marks

Add StudentInteractive preview of the application. The actual React program runs in your browser.

Result: Thus, the React JS application for displaying student details and adding new student records dynamically was implemented successfully.
