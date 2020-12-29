import React from "react";
import AvatarSelect from "../components/AvatarSelect";
import student from "../utils/student-interface";
import Tags from "../components/Tags";

interface Props {
  onAddStudent: (e: React.FormEvent<HTMLFormElement>, student: student) => void;
}

const Form: React.FunctionComponent<Props> = ({ onAddStudent }) => {
  const [values, setValues] = React.useState<student>({
    id: 0,
    firstName: "",
    lastName: "",
    company: "",
    grades: ["", "", "", "", ""],
    email: "",
    pic: "",
    skill: "",
    tags: [],
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({ ...values, ...fieldValue });
  };
  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    const gradeNumber = parseInt(name.substr(-1));
    const newState = { ...values };
    newState.grades[gradeNumber] = value;
    setValues(newState);
  };

  const handleAddTag = (
    e: React.KeyboardEvent<HTMLInputElement>,
    student: student,
    tagInput: string,
    setState: (value: React.SetStateAction<student>) => void = setValues
  ): Promise<string> => {
    if (e.keyCode === 13) {
      const studentCopy = { ...student };
      if (studentCopy.tags.indexOf(tagInput) !== -1)
        alert("You've already added that tag!");
      else studentCopy.tags.push(tagInput);
      setState(studentCopy);
      return Promise.resolve("");
    }
    return Promise.resolve(tagInput);
  };

  const gradesTable = [];
  let i = 0;
  while (i < 5) {
    gradesTable.push(
      <tr key={i}>
        <td>{i + 1}</td>
        <td>
          <input
            name={`grade-${i}`}
            value={values.grades[i]}
            onChange={handleGradeChange}
          />
        </td>
        <td>
          <input />
        </td>
      </tr>
    );
    i++;
  }

  return (
    <form
      id="student-form"
      method="POST"
      onSubmit={(e) => onAddStudent(e, values)}
    >
      <h1>Create student</h1>
      <h2>Choose an avatar</h2>
      <AvatarSelect picValue={values.pic} onChange={handleInputChange} />
      <div className="row">
        <div className="column">
          <input
            name="firstName"
            type="text"
            value={values.firstName}
            onChange={handleInputChange}
            placeholder="First name"
          />
          <input
            name="lastName"
            type="text"
            value={values.lastName}
            onChange={handleInputChange}
            placeholder="Last name"
          />
          <input
            name="company"
            type="text"
            value={values.company}
            onChange={handleInputChange}
            placeholder="Company"
          />
          <input
            name="email"
            type="text"
            value={values.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            name="skill"
            type="text"
            value={values.skill}
            onChange={handleInputChange}
            placeholder="Skill"
          />
        </div>
        <div className="grades column">
          <h3>Grades</h3>
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>score</td>
                <td>total</td>
              </tr>
            </thead>
            <tbody>{gradesTable.map((x) => x)}</tbody>
          </table>
        </div>
      </div>
      <div>
        <Tags student={values} onAddTag={handleAddTag} />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
