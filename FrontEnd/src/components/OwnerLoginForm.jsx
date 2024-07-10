import React, { useState } from 'react';
import '../styles/ownerLoginForm.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// OwnerLoginForm component
const OwnerLoginForm = () => {
    // State variables to store the email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Get the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Event handler for the login button
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Validate the input fields
        if (!email || !password) {
            alert("fill all fields")
            return;
        }

        try {
            // Set up the axios request configuration
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };

            // Create the user data object
            const userData = {
                email,
                password,
            };

            // Send a POST request to the server to authenticate the user
            const { data } = await axios.post(
                "/api/owner/login",
                userData,
                config
            );

            // Store the user information in the local storage
            localStorage.setItem("userInfo", JSON.stringify(data));

            // Navigate to the owner page
            navigate('/OwnerPage');
        } catch (err) {
            alert("an Error Occurred")
        }
    }

    // Render the owner login form
    return (
        <div className="login-page">
            <div className="login-section owner-login">
                <div className="login-container">
                    <h2 className='text-3xl text-green-900'>Login</h2>
                    <p>to Bike Service for Owners</p>
                    <input
                        type="email"
                        placeholder="Your work email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Next</button>
                </div>
            </div>
            <div className="login-section customer-login">
                <div className="ebook-container">
                    <h2>BIKE STORE OWNERS</h2>
                    <h1>Revolutionize Your Bike Shop Management</h1>
                    <p>
                        Streamline your operations, boost customer satisfaction, and pedal your business to new heights with our cutting-edge bike service management platform. Designed specifically for bike store owners like you.
                    </p>
                    <button>Get Started</button>
                </div>
            </div>
        </div>
    );
}

export default OwnerLoginForm