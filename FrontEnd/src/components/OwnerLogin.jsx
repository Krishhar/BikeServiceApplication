import React from 'react';
import '../styles/Login.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from react-router-dom

// OwnerLogin component
const OwnerLogin = () => {
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
        navigate('/ownerLogin'); // Navigate to the '/ownerLogin' route
    };

    // Render the owner login interface
    return (
        <>
            <div className="login-container">
                {/* Heading */}
                <h2 className='text-4xl'>For <span className='text-emerald-800'>Owners</span></h2>

                {/* Description */}
                <p>We are the market-leading bike service platform to manage your services efficiently.</p>

                {/* Login button */}
                <button onClick={handleSignIn}>Login</button>

                {/* Sign up link */}
                <p>Don't have an account? <a className='font-bold onClick={handleSignUp}' onClick={handleSignUp}>Sign up</a>.</p>
            </div>
        </>
    );
};

// Export the OwnerLogin component as the default export
export default OwnerLogin;