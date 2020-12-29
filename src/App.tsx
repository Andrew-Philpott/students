import React from "react";
import student from "./utils/student-interface";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import StudentForm from "./pages/StudentForm";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  const [students, setStudents] = React.useState<Array<student>>([]);

  React.useEffect(() => {
    fetch("http://localhost:3030")
      .then((response) => response.text())
      .then((text) => {
        return JSON.parse(text).students;
      })
      .then(setStudents)
      .catch(() => alert("There was an error fetching from the api!"));
  }, []);

  const handleAddStudent = (
    e: React.FormEvent<HTMLFormElement>,
    student: student
  ): void => {
    e.preventDefault();
    console.log(student);
    fetch("http://localhost:3030/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
      .then((response) => response.text())
      .then(JSON.parse)
      .then((student) => {
        setStudents([...students, student]);
      });
  };

  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/">
            <Home students={students} setStudents={setStudents} />
          </Route>
          <Route exact path={["/new", "/edit/:id"]}>
            <StudentForm onAddStudent={handleAddStudent} />
          </Route>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
