import React, { useState } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBarSearch({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(keyword);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">🍕 PizzaShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Search pizza..."
              className="me-2"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button variant="outline-primary" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarSearch;
