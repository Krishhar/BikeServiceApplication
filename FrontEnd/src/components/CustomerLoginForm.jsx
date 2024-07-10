import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// CustomerLoginForm component
const CustomerLoginForm = () => {
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
            alert('fill all fields')
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
                "/api/customer/login",
                userData,
                config
            );

            // Store the user information in the local storage
            localStorage.setItem("userInfo", JSON.stringify(data));

            // Navigate to the customer page
            navigate('/customerPage');
        } catch (err) {
            console.log(err)
            alert("Login Failed") // Display an alert message if the login fails
        }
    }

    // Render the customer login form
    return (
        <div className="login-page">
            <div className="login-section customer-login">
                <div className="ebook-container">
                    <h2>BIKERS</h2>
                    <h1>Your Bike's Best Friend</h1>
                    <p>
                        Keep your ride in top shape with easy service bookings, maintenance reminders, and expert care from local bike shops. Never miss a tune-up and enjoy smoother rides year-round.
                    </p>
                    <button>Find a Shop</button>
                </div>
            </div>
            <div className="login-section owner-login">
                <div className="login-container">
                    <h2 className='text-3xl text-green-900'>Login</h2>
                    <p>to Bike Service for Customers</p>
                    <input
                        type="email"
                        placeholder="Your work email"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <input
                        type="password"
                        placeholder="Your Password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default CustomerLoginForm