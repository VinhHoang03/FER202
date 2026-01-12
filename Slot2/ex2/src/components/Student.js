import { Card, Button } from 'react-bootstrap';
//Khai báo 1 đối tượng student gồm name, age, avatar, grade
//In thông tin của h1, p và img
function Student() {
    const student = {id: 1, name: 'Lê Minh Hô', age: 20, avatar: 'image.png', grade: 'A'};
    console.log(student);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={student.avatar} />
                <Card.Body>
                    <Card.Title>{student.name}</Card.Title>
                    <Card.Text>
                        <strong>ID:</strong> {student.id} <br />
                        <strong>Age:</strong> {student.age} <br />
                        <strong>Grade:</strong> {student.grade}
                    </Card.Text>
                    <Button variant="primary">View Profile</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Student;