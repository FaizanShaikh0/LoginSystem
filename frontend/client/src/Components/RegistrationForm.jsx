import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
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
      const response = await axios.post('http://localhost:5000/api/register', formData);
      localStorage.setItem('user', JSON.stringify(formData));
      navigate("/");
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <Container fluid className="d-flex vh-100">
      <Row className="justify-content-center align-items-center w-100">
        <Col md={{ span: 6 }}>
          <Card bg="light">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
              <h2 className="text-center">SignUP</h2>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                </Form.Group>
                <Button className="mt-5 mb-3 w-100" variant="primary" type="submit">Register</Button>
                <p>Already Have an Account? <Link to="/">Login</Link></p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};

export default RegistrationForm;
