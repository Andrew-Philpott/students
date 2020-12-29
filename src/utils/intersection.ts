import student from "./student-interface";

const intersection =(tagsArray: student[], namesArray: student[]):student[] => {
  return tagsArray.filter((x) => namesArray.some(
    (y) => x.firstName === y.firstName || x.lastName === y.lastName
  )
  );
};

export default intersection;