import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  InputGroup,
  ListGroup,
} from "react-bootstrap";

export default function TodoList() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (task.trim() === "") return;

    setTodos([...todos, task]);
    setTask("");
  };

  const handleDelete = (index) => {
    const newList = todos.filter((_, i) => i !== index);
    setTodos(newList);
  };

  return (
    <Container className="my-4">
      <Card
        style={{ maxWidth: "600px" }}
        className="mx-auto bg-dark text-white"
      >
        <Card.Body>
          <h4 className="mb-3">Todo List</h4>
          <InputGroup className="mb-4">
            <Form.Control
              placeholder="Enter a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button variant="danger" onClick={handleAdd}>
              Add
            </Button>
          </InputGroup>
          <ListGroup>
            {todos.map((item, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                {item}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}
