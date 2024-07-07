import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import OwnerLoginForm from './components/OwnerLoginForm';
import CustomerLoginForm from './components/CustomerLoginForm';
import OwnerPage from './pages/OwnerPage';
import CustomerPage from './pages/CustomerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="ownerLogin" element={<OwnerLoginForm />} />
        <Route path="customerLogin" element={<CustomerLoginForm />} />
        <Route path="OwnerPage" element={<OwnerPage />} />
        <Route path="customerPage" element={<CustomerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
