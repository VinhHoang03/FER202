import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
// import "./ProductForm.css";

function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Product Info:\nName: ${form.name}\nPrice: ${form.price}\nCategory: ${form.category}`
    );
  };

  return (
    <Container className="my-4">
      <Card style={{ maxWidth: "500px" }} className="mx-auto">
        <Card.Body>
          <h4 className="mb-3">Exercise 3: Product Form</h4>

          <Form onSubmit={handleSubmit}>
            {/* TÊN SẢN PHẨM */}
            <Form.Group className="mb-3">
              <Form.Label>Tên san pham</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>

            {/* GIÁ */}
            <Form.Group className="mb-3">
              <Form.Label>Gia</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </Form.Group>

            {/* DANH MỤC */}
            <Form.Group className="mb-3">
              <Form.Label>Danh muc</Form.Label>
              <Form.Select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value=""> -- Chọn danh muc --</option>
                <option value="Food">Food</option>
                <option value="Drink">Drink</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group> 

            <Button type="submit" variant="primary">
               Lưu san phẩm
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductForm;
