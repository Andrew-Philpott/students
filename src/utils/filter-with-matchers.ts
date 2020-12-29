import student from "./student-interface";

const filterWithMatchers =(students: any[], query: string, matchers: string[], setResults: React.Dispatch<React.SetStateAction<student[]>>) =>{
  if (query.length >= 2) {
    const regex = new RegExp(`^${query}`, "i");
    const results: student[] = [];
    matchers.forEach((element) => {
      students.forEach((data) => {
        if (regex.test(data[element])) results.push(data);
      });
    });
    if (results) setResults(results);
  }
}

export default filterWithMatchers;