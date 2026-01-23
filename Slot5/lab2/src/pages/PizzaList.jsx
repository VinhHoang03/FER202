//PizzaList.jsx
import React from 'react';
import pizzaList from '../data/pizzaList';
import { Row, Col } from 'react-bootstrap';
import PizzaCard from '../components/PizzaCard';
function PizzaList() {
  return (
    <div className="container my-5">
      <Row>
        {pizzaList.map(pizza => (
          <Col key={pizza.id} md={4} className="mb-4 d-flex">
            <PizzaCard pizza={pizza} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
export default PizzaList;