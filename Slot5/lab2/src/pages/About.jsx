import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function About() {
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1>About Us 🍕</h1>
          <p>
            Our Pizza Shop was founded with a passion for delicious food
            and great customer service.
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                To bring happiness through food.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Our Vision</Card.Title>
              <Card.Text>
                Become the most loved pizza brand.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Our Values</Card.Title>
              <Card.Text>
                Quality, Trust, Customer First.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
