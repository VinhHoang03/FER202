import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Student({ student }) {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={student.avatar} style={{height: "200px",objectFit: "cover"}}/>
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