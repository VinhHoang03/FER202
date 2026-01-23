import { Card, Button,  } from "react-bootstrap";

function PizzaCard({ pizza }) {
  return (
    <Card className="h-100">
      <Card.Img
          variant="top"
          src={pizza.image}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{pizza.name}</Card.Title>
        <Card.Text className="flex-grow-1">{pizza.description}</Card.Text>
        <div className="mt-auto">
          {pizza.oldPrice && (
            <span className="text-decoration-line-through me-2">${pizza.oldPrice}</span>
          )}
          <span className="fw-bold">${pizza.price}</span>
        </div>
        <Button variant="primary" className="w-100">Order Now</Button>
        <Button variant="secondary" className="w-100 mt-2">View Details</Button>
      </Card.Body>
    </Card>
  );
}
export default PizzaCard;