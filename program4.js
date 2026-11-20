npx create-react-app program4
cd program4
inside src
Student.js

import React from "react";

const studlist = [
  {
    slno: 1,
    name: "stud1",
    usn: "rvce1",
    tmarks: 150,
  },
  {
    slno: 2,
    name: "stud2",
    usn: "rvce2",
    tmarks: 145,
  },
];

class StudentRow extends React.Component {
  render() {
    const stud1 = this.props.stdli;

    return (
      <tr>
        <td>{stud1.slno}</td>
        <td>{stud1.name}</td>
        <td>{stud1.usn}</td>
        <td>{stud1.tmarks}</td>
      </tr>
    );
  }
}

class StudentsTable extends React.Component {
  render() {
    const studrows = this.props.studlist.map(
      (studli) => (
        <StudentRow
          key={studli.slno}
          stdli={studli}
        />
      )
    );

    return (
      <table border="1">
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

class StudentAddSubmit extends React.Component {
  constructor() {
    super();

    this.handleSubmit =
      this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    const studli = {
      name: form.name.value,
      usn: form.usn.value,
      tmarks: form.tmarks.value,
    };

    console.log("studli -", studli);

    this.props.CreateStudentAdd(studli);

    form.reset();
  }

  render() {
    return (
      <form
        name="studAdd"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
        />

        <input
          type="text"
          name="usn"
          placeholder="USN"
          required
        />

        <input
          type="text"
          name="tmarks"
          placeholder="Total Marks"
          required
        />

        <button type="submit">Add</button>
      </form>
    );
  }
}

class StudentListTable extends React.Component {
  constructor() {
    super();

    this.state = {
      newStudList: [],
    };

    this.CreateStudentAdd =
      this.CreateStudentAdd.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({
        newStudList: studlist,
      });
    }, 5000);

    console.log(
      "I have loaded the student add component also"
    );
  }

  CreateStudentAdd(studli) {
    const studlength =
      this.state.newStudList.length + 1;

    studli.slno = studlength;

    const newstudlist1 =
      this.state.newStudList.slice();

    newstudlist1.push(studli);

    this.setState({
      newStudList: newstudlist1,
    });
  }

  render() {
    return (
      <React.Fragment>
        <h2>Student Registration Portal</h2>

        <hr />

        <StudentsTable
          studlist={this.state.newStudList}
        />

        <hr />

        <StudentAddSubmit
          CreateStudentAdd={this.CreateStudentAdd}
        />

      </React.Fragment>
    );
  }
}

export default StudentListTable;

src/App.js

import React from "react";
import "./App.css";
import StudentListTable from "./Student";

function App() {
  return (
    <div className="App">
      <StudentListTable />
    </div>
  );
}

export default App;

src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

src/index.css

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: white;
}

npm install
npm start

-------------------------
npx create-react-app program4
cd program4
npm start

Student.js
import React from "react";

const studlist = [
  { slno: 1, name: "stud1", usn: "rvce1", tmarks: 150 },
  { slno: 2, name: "stud2", usn: "rvce2", tmarks: 145 }
];

class StudentListTable extends React.Component {
  constructor() {
    super();
    this.state = { students: [] };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ students: studlist });
    }, 5000);
  }

  addStudent = (e) => {
    e.preventDefault();
    const form = e.target;

    const student = {
      slno: this.state.students.length + 1,
      name: form.name.value,
      usn: form.usn.value,
      tmarks: form.tmarks.value
    };

    this.setState({
      students: [...this.state.students, student]
    });

    form.reset();
  };

  render() {
    return (
      <>
        <h2>Student Registration Portal</h2>

        <table border="1">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Name</th>
              <th>USN</th>
              <th>Total Marks</th>
            </tr>
          </thead>

          <tbody>
            {this.state.students.map((s) => (
              <tr key={s.slno}>
                <td>{s.slno}</td>
                <td>{s.name}</td>
                <td>{s.usn}</td>
                <td>{s.tmarks}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <form onSubmit={this.addStudent}>
          <input name="name" placeholder="Name" required />
          <input name="usn" placeholder="USN" required />
          <input name="tmarks" placeholder="Total Marks" required />
          <button type="submit">Add</button>
        </form>
      </>
    );
  }
}

export default StudentListTable;

app.js
import React from "react";
import StudentListTable from "./Student";

function App() {
  return (
    <div className="App">
      <StudentListTable />
    </div>
  );
}

export default App;

index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

            npm install
npm start
