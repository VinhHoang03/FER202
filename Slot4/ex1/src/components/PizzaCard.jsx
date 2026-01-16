import { Card, Button,  } from "react-bootstrap";

function PizzaCard({ pizza }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={pizza.image} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{pizza.name}</Card.Title>
        <Card.Text className="flex-grow-1">{pizza.description}</Card.Text>
        <div className="mt-auto">
          {pizza.oldPrice && (
            <span className="text-decoration-line-through me-2">${pizza.oldPrice}</span>
          )}
          <span className="fw-bold">${pizza.price}</span>
        </div>
      </Card.Body>
    </Card>
  );
}
export default PizzaCard;