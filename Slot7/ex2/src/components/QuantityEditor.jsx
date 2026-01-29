
import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

function QuantityEditor() {
  const [quantity, setQuantity] = useState(0);

  const handleDecrease = () => {
      setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleChange = (e) => {
    const value = Number(e.target.value);
    setQuantity(value >= 0 ? value : 0);
  };
  return (
    <InputGroup style={ { maxWidth: "200px" }}>
      <Button variant="primary" onClick={handleIncrease}>
        +
      </Button>

      <Form.Control
        type="number"
        value={quantity}
        onChange={handleChange}
        min={0}
        className="text-center"
      />

      <Button variant="primary" onClick={handleDecrease}>
        -
      </Button>
    </InputGroup>

  );}
export default QuantityEditor;
