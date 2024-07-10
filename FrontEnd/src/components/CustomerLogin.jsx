import React from 'react';
import '../styles/Login.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from react-router-dom

// CustomerLogin component
const CustomerLogin = () => {
    // Use the useNavigate hook to get the navigate function
    const navigate = useNavigate();

    // Event handler for the "Sign Up" link
    const handleSignUp = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        navigate('/register'); // Navigate to the '/register' route
    };

    // Event handler for the "Login" button
    const handleSignIn = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        navigate('/customerLogin'); // Navigate to the '/customerLogin' route
    };

    // Render the customer login interface
    return (
        <div className="login-container">
            {/* Heading */}
            <h2 className='text-4xl'>For <span className='text-emerald-800'>Customers</span></h2>

            {/* Description */}
            <p>Join our platform to book services, track your vehicle, and get the best service experience.</p>

            {/* Login button */}
            <button onClick={handleSignIn}>Login</button>

            {/* Sign up link */}
            <p>Don't have an account? <a className='font-bold cursor-pointer' onClick={handleSignUp}>Sign up</a>.</p>
        </div>
    );
};

// Export the CustomerLogin component as the default export
export default CustomerLogin;