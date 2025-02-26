// Important traditional fs library to read/write files using callbacks
import fs from 'fs-extra';

function getSubstring(str, char1, char2) {
    return str.substring(
        str.indexOf(char1) + 1,
        str.indexOf(char2)
    );
}

const cheques = await fs.readJson('data/2023-cheques.json');
//const links = cheques.map(c => `http://192.168.101.1${c.FrontImage1}`).join("\n")
const chequeNums = cheques.map((c,i) =>
    `${i + 1} -> ${c.MICR} -> ${getSubstring(c.MICR.substring(1), '<', '>')}`).join("\n")
console.log(chequeNums)

const links = cheques.map(c => `http://192.168.101.1${c.FrontImage1}`).join("\n")
console.log(links)
//console.log(cheques)

/* Now let's make  a function named getStudent to return the details by studentId
 Because getStudent calls a async function itself becomes an async function
*/
async function getStudent(studentId)
{
    const students = await fs.readJson('data/student.json');
    return students.find(s => s.studentId === studentId);
}

async function getProgramName(programCode) {
    const programs = await fs.readJson('data/ceng-programs.json');
    return programs.find(p => p.code === programCode).name;
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
    }
    catch (err) {
        console.log(err);
    }
}

//main();