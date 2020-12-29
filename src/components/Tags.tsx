import React from "react";
import student from "../utils/student-interface";

interface Props {
  student: student;
  onAddTag: (
    e: React.KeyboardEvent<HTMLInputElement>,
    student: student,
    tagInput: string
  ) => Promise<string>;
}

const Tags: React.FunctionComponent<Props> = ({ student, onAddTag }) => {
  const [tagInput, setTagInput] = React.useState("");
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTagInput(e.target.value);
  return (
    <div className="tags">
      <ul>
        {student.tags?.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
      <input
        type="text"
        value={tagInput}
        onChange={handleTagInput}
        onKeyDown={(e)=>onAddTag(e, student, tagInput).then(setTagInput)}
        className="add-tag-input"
        placeholder="Add a tag"
      />
    </div>
  );
};

export default Tags;
