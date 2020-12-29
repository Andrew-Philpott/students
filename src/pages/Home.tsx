import React from "react";
import Search from "../components/Search";
import Student from "../components/Student";
import student from "../utils/student-interface";
import filterWithMatchers from "../utils/filter-with-matchers";
import intersection from "../utils/intersection";
import { useHistory } from "react-router-dom";

interface Props {
  students: Array<student>;
  setStudents: React.Dispatch<React.SetStateAction<student[]>>;
}

const Home: React.FunctionComponent<Props> = ({ students, setStudents }) => {
  const history = useHistory();
  const [values, setValues] = React.useState({ name: "", tag: "" });
  const [searchNamesResults, setSearchNamesResults] = React.useState<
    Array<student>
  >([]);
  const [searchTagsResults, setSearchTagsResults] = React.useState<
    Array<student>
  >([]);
  const [searchResults, setSearchResults] = React.useState<Array<student>>([]);
  const handleAddTag = (
    e: React.KeyboardEvent<HTMLInputElement>,
    student: student,
    tagInput: string,
    setState: (value: React.SetStateAction<student[]>) => void = setStudents
  ): Promise<string> => {
    if (e.keyCode === 13) {
      const studentCopy = { ...student };
      if (studentCopy.tags.indexOf(tagInput) !== -1)
        alert("You've already added that tag!");
      else {
        studentCopy.tags.push(tagInput);
        const results = students.map((x: student) =>
          x.firstName === studentCopy.firstName &&
          x.lastName === studentCopy.lastName
            ? studentCopy
            : x
        );
        setState(results);
        return Promise.resolve("");
      }
    }
    return Promise.resolve(tagInput);
  };
  function test(
    students: Array<student>,
    sub: string,
    property: string,
    results: Array<student>
  ): Promise<Array<student>> {
    students.forEach((student) => {
      sub = sub.toLowerCase();
      if (property === "names") {
        if (
          student.firstName
            .toLowerCase()
            .startsWith(
              sub.slice(0, Math.max(student.firstName.length - 1, 1))
            ) ||
          student.lastName
            .toLowerCase()
            .startsWith(sub.slice(0, Math.max(student.lastName.length - 1, 1)))
        ) {
          results.push(student);
        }
      } else {
        for (let i = 0; i < student.tags.length; i++) {
          const element = student.tags[i];
          if (
            element
              .toLowerCase()
              .startsWith(
                sub.slice(0, Math.max(student.lastName.length - 1, 1))
              )
          ) {
            results.push(student);
            i = student.tags.length;
          }
        }
      }
    });

    return Promise.resolve(results);
  }
  const handleSearchInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
    const results: student[] = [];
    if (name === "name" && values.name.length >= 2) {
      test(students, values.name, "names", results).then(setSearchResults);
    }
    if (values.tag.length >= 2) {
      test(students, values.tag, "", results).then(setSearchResults);
    }
    // if (values.name.length >= 2 && values.tag.length >= 2)
    // setSearchResults(intersection(searchTagsResults, searchNamesResults));
  };

  React.useEffect(() => {
    if (students.length !== 0) {
      setSearchResults(students);
    }
  }, [students]);

  return (
    <React.Fragment>
      <Search values={values} onSearchInputsChange={handleSearchInputsChange} />
      <div className="column students">
        <button onClick={() => history.push("/new")}>Add student</button>
        {searchResults.length !== 0 &&
          searchResults.map((student, index) => (
            <Student key={index} onAddTag={handleAddTag} student={student} />
          ))}
      </div>
    </React.Fragment>
  );
};

export default Home;
