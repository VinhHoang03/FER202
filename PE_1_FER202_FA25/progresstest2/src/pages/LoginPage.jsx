import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { FiUser, FiLock, FiShield } from "react-icons/fi";
import { getUsers } from "../services/accountService";
import { useAppContext } from "../contexts/AppContext";
import MessageModal from "../components/MessageModal";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [alertMsg, setAlertMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!identifier.trim())
      newErrors.identifier = "Username or Email is required.";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMsg("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const users = await getUsers();
      const user = users.find(
        (usr) => usr.username === identifier  && usr.password === password
      );
      if (!user) {
        setAlertMsg("Invalid username/email or password!");
        return;
      }
      setLoggedUser(user);
      setShowModal(true);
    } catch (err) {
      setAlertMsg("Server error. Please try again later.");
    }
  };

  const handleContinue = () => {
    login(loggedUser);
    setShowModal(false);
    navigate("/accounts");
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Container style={{ maxWidth: "440px" }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
            style={{
              width: "68px",
              height: "68px",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              boxShadow: "0 0 30px rgba(59,130,246,0.4)",
            }}
          >
            <FiShield size={32} color="white" />
          </div>
          <h2
            className="text-white fw-bold mb-1"
            style={{ letterSpacing: "-0.5px" }}
          >
            Admin Portal
          </h2>
          <p className="text-white-50 small mb-0">
            User Account Management System
          </p>
        </div>

        <Card className="border-0 shadow-lg" style={{ borderRadius: "16px" }}>
          <Card.Body className="p-4">
            <h5 className="fw-bold mb-4 text-dark">Sign In</h5>

            {alertMsg && (
              <Alert
                variant="danger"
                dismissible
                onClose={() => setAlertMsg("")}
                className="mb-3 py-2"
                style={{ fontSize: "0.875rem" }}
              >
                {alertMsg}
              </Alert>
            )}

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small text-secondary text-uppercase">
                  Username or Email
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0 text-muted">
                    <FiUser size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter username or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    isInvalid={!!errors.identifier}
                    className="border-start-0 bg-light"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.identifier}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold small text-secondary text-uppercase">
                  Password
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-light border-end-0 text-muted">
                    <FiLock size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
                    className="border-start-0 bg-light"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 fw-semibold py-2"
                style={{ borderRadius: "8px", letterSpacing: "0.3px" }}
              >
                Sign In
              </Button>
            </Form>

            <p className="text-center text-muted small mt-3 mb-0">
              <span className="me-1">🔑</span>
              Default credentials: <strong>fudn</strong> /{" "}
              <strong>123456</strong>
            </p>
          </Card.Body>
        </Card>
      </Container>
      
      <MessageModal
        show={showModal}
        message={`Welcome, ${loggedUser?.username}! Login successful.`}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default LoginPage;
