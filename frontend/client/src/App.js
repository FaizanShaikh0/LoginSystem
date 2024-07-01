import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import ProtectedPage from './Components/ProtectedPage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/Protected" element={<ProtectedPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
