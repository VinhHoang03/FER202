import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Khai báo 1 đối tượng student gồm name, age, avatar, grade
//In thông tin của h1, p và img
function About() {
    const student = { id: 1, name: 'Alice', age: 20, avatar: 'image.png', grade: 'A' };
    console.log(student);
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={student.avatar} />
                <Card.Body>
                    <Card.Title>{student.id}</Card.Title>
                    <Card.Text>
                        <p>
                            {student.id} - {student.age} - {student.grade}
                        </p>
                    </Card.Text>

                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default About;