import React from "react";
import student from "../utils/student-interface";
import average from "../utils/average";
import Tags from "./Tags";

interface Props {
  student: student;
  onAddTag: (
    e: React.KeyboardEvent<HTMLInputElement>,
    student: student,
    tagInput: string
  ) => Promise<string>;
}

const Student: React.FunctionComponent<Props> = ({ student, onAddTag }) => {
  const [isTestScoresVisible, setIsTestScoresVisible] = React.useState(false);
  const [image, setImage] = React.useState("");
  const handleTestScoresVisibility = () => {
    setIsTestScoresVisible(!isTestScoresVisible);
  };

  (function loadImage(imageName: string) {
    import(`../assets/${imageName}.png`).then((image) => {
      setImage(image.default);
    });
  })(student.pic);

  const testScores = isTestScoresVisible && (
    <React.Fragment>
      <ul>
        {student.grades.map((grade: string, index: number) => (
          <li key={index}>
            <span>Test {index + 1}:</span>
            <span>{grade}%</span>
          </li>
        ))}
      </ul>
      <Tags student={student} onAddTag={onAddTag} />
    </React.Fragment>
  );

  return (
    <div className="student">
      <div className="photo column">
        <div>
          {image && (
            <img
              src={image}
              alt={`${student.firstName} ${student.lastName}`}
              height="60px"
              width="60px"
            />
          )}
        </div>
      </div>
      <div className="info column">
        <div className="header">
          <h1>
            {student.firstName} {student.lastName}
          </h1>
          <button className="expand-btn" onClick={handleTestScoresVisibility}>
            {isTestScoresVisible ? <>&#8722;</> : <>&#43;</>}
          </button>
        </div>
        <div className="details">
          <ul>
            <li>Email: {student.email}</li>
            <li>Company: {student.company}</li>
            <li>Skill: {student.skill}</li>
            <li>
              Average: {average(student.grades.map((x: string) => parseInt(x)))}
              %
            </li>
          </ul>
          {testScores}
        </div>
      </div>
    </div>
  );
};

export default Student;
