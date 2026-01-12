import { Card, Button } from 'react-bootstrap';
//Khai báo 1 đối tượng student gồm name, age, avatar, grade
//In thông tin của h1, p và img
function Student({ student }) {
    return (
        <div>
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