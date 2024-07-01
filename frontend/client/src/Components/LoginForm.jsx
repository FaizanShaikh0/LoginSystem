import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';



const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);

      // Check if the response status is 200 (OK)
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        // Navigate to ProtectedPage after successful login
        navigate('/protected');
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert("Something went wrong");
    }
  };

  return (
    <Container fluid className="d-flex vh-100">
    <Row className="justify-content-center align-items-center w-100">
      <Col md={{ span: 6 }}>
        <Card bg="light">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <h2 className="text-center">Login</h2>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button className="mt-5 mb-3 w-100"variant="primary" type="submit">Login</Button>
              <p>Don't Have Account? <Link to="/register">Sign Up</Link></p>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
};

export default LoginForm;
