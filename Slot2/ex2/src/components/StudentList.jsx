import Student from "./Student";
import listOfStudent from "../data/listOfStudent";

function StudentList() {
    return (
        <div 
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                padding: "20px"
            }}
        >
            {listOfStudent.map((student) => (
                <Student key={student.id} student={student} />
            ))}
        </div>
    );
}

export default StudentList;
