const { v4 } = require("uuid");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const path = "./students.json";

app.get("/", function (req, res) {
  const contents = fs.readFileSync(path);
  res.send(contents);
});

app.post("/add", function (req, res) {
  const contents = fs.readFileSync(path);
  const students = JSON.parse(contents).students;
  const student = req.body;
  student.id = v4();
  students.push(student);
  const data = JSON.stringify({ students: students });
  console.log(data);

  fs.writeFile(path, data, "utf8", function (err) {
    if (err) return console.log(err);
    res.send(data);
    console.log("The file was saved!");
  });
});

app.listen(3030);

module.exports = app;
