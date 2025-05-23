// Important traditional fs library to read/write files using callbacks
import { readFile } from "node:fs/promises"

/* try {
  const students = await readFile("data/student.json");
  console.log(JSON.parse(students));
} catch (err) {
  console.error(err);
} */

/* studentsPromise.then((students) => {
    console.log(JSON.parse(students));
  })
  .catch((err) => {
    console.log(err);
  }); */

/* Now let's make  a function named getStudent to return the details by studentId
 Because getStudent calls a async function itself becomes an async function
*/
async function getStudent(studentId) {
  const students = JSON.parse(await readFile("data/student.json"));
  return students.find((s) => s.studentId === studentId);
}

async function getProgramName(programCode) {
  const programs = await JSON.parse(await readFile("data/ceng-programs.json"));
  return programs.find((p) => p.code === programCode).name;
}

async function main() {
  try {
    const studentId = 2015009;
    const student = await getStudent(studentId);
    console.log("\nStudent ", student);

    const ProgramName = await getProgramName(student.program);
    console.log("\nProgram Name: ", ProgramName);
    student.program += ` - ${ProgramName}`;

    console.log("\nStudent with a full program name: ", student);
  } catch (err) {
    console.log(err);
  }
}

main();
