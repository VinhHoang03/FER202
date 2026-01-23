import React from "react";
import { Row, Col, Button } from "react-bootstrap";

function PizzaDetailCard({ pizza }) {
  return (
    <Row>
      <Col md={6}>
        <img
          src={pizza.image}
          alt={pizza.name}
          className="img-fluid rounded"
          style={{ objectFit: "cover", width: "100%" }}
        />
      </Col>

      <Col md={6}>
        <h2>{pizza.name}</h2>
        <p>{pizza.description}</p>

        <h4 className="text-primary">${pizza.price}</h4>

        <Button variant="success" className="mt-3">
          Order Now
        </Button>
      </Col>
    </Row>
  );
}

export default PizzaDetailCard;
