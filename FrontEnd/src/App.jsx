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
import AuthProvider from './context/AuthProvider';
import UpdateServiceModal from './components/UpdateServiceModal';

// App component
function App() {
  // Render the application
  return (
    // Wrap the application with the Router component from react-router-dom
    <Router>
      {/* Wrap the application with the AuthProvider component */}
      <AuthProvider>
        {/* Define the routes for the application */}
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />
          {/* Register page route */}
          <Route path="register" element={<Register />} />
          {/* Login page route */}
          <Route path="login" element={<Login />} />
          {/* Owner login form route */}
          <Route path="ownerLogin" element={<OwnerLoginForm />} />
          {/* Customer login form route */}
          <Route path="customerLogin" element={<CustomerLoginForm />} />
          {/* Owner page route */}
          <Route path="OwnerPage" element={<OwnerPage />} />
          {/* Customer page route */}
          <Route path="customerPage" element={<CustomerPage />} />
          {/* Update service modal route */}
          <Route path="update" element={<UpdateServiceModal />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App
