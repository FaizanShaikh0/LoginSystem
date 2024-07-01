import React from 'react';
import { Table } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

const ProtectedPage = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!user || !token) {
    return <Navigate to="/" />;
  }

  const parsedUser = JSON.parse(user);

  return (
    <div>
      <h1>Protected Page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{parsedUser.name}</td>
            <td>{new Date(parsedUser.dateOfBirth).toLocaleDateString()}</td>
            <td>{parsedUser.email}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProtectedPage;
