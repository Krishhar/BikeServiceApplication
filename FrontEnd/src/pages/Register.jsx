import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Register component
const Register = () => {
    // State variables to hold the registration form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ph, setPh] = useState('');
    const [maxLimit, setMaxLimit] = useState(5);
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('owner');

    // Get the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Helper functions to validate the form inputs
    const isAlphabetsOnly = (value) => /^[a-zA-Z ]+$/.test(value);
    const isNumeric = (value) => /^\d+$/.test(value);
    const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    // Validate the form inputs
    const isUsernameValid = isAlphabetsOnly(name);
    const isPasswordValid = password.length >= 6;
    const isEmailValidValue = isEmailValid(email);
    const isPhoneValid = isNumeric(ph) && ph.length === 10;

    // Check if the entire form is valid
    const isFormValid =
        isUsernameValid &&
        isPasswordValid &&
        isEmailValidValue &&
        isPhoneValid;

    // Handle the form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            // Display a warning toast message if any required field is empty
            toast.warn("Fill all Fields", {
                position: "bottom-right",
                autoClose: 6000,
            });
            return;
        }

        if (isFormValid) {
            try {
                // Set up the axios request configuration
                const config = {
                    headers: {
                        "Content-type": "application/json"
                    }
                };

                // Create the user data object
                const userData = {
                    name,
                    email,
                    password,
                    ph,
                    maxLimit,
                    address,
                    role
                };

                let response;
                if (role === 'owner') {
                    // Make a POST request to register the owner
                    response = await axios.post(
                        "/api/owner/",
                        userData,
                        config
                    );
                    // Store the owner information in localStorage
                    localStorage.setItem("ownerInfo", JSON.stringify(response.data));
                    navigate('/login');
                } else {
                    // Create the customer data object
                    const userData1 = {
                        name,
                        email,
                        password,
                        ph,
                        role
                    };

                    // Make a POST request to register the customer
                    response = await axios.post(
                        "/api/customer/",
                        userData1,
                        config
                    );

                    // Store the customer information in localStorage
                    localStorage.setItem("customerInfo", JSON.stringify(response.data));
                    navigate('/login');
                }
            } catch (error) {
                console.error('Registration failed:', error);
            }
        }
    };

    // Render the registration form
    return (
        <div className="max-w-md mx-auto my-0 p-5 text-center mt-10">
            <h1 className='text-3xl mb-2 font-bold'>Create account</h1>
            <p className='text-gray-600 mb-4'>We'll personalize your setup experience accordingly.</p>
            <form className="flex flex-col items-center" onSubmit={handleSignup}>
                {/* Role selection */}
                <div className="w-full mb-4 text-black">
                    <label className='block text-left mb-2 font-bold'>Role</label>
                    <select
                        id='role'
                        className='w-full p-2 border border-gray-300 rounded'
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                    >
                        <option value="owner">Owner</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>
                {/* Name input */}
                <div className="w-full mb-4">
                    <label className='block text-left mb-2 font-bold'>Name</label>
                    <input
                        id='name'
                        className='w-full p-2 border border-gray-300 rounded text-black'
                        type="text" placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {!isUsernameValid && <span className='text-red-500 text-sm'>Only alphabets are allowed</span>}
                </div>
                {/* Email input */}
                <div className="w-full mb-4">
                    <label className='block text-left mb-2 font-bold'>Email</label>
                    <input
                        id='email'
                        className='w-full p-2 border border-gray-300 rounded text-black'
                        type="email" placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!isEmailValidValue && <span className='text-red-500 text-sm'>Invalid email address</span>}
                </div>
                {/* Password input */}
                <div className="w-full mb-4">
                    <label className='block text-left mb-2 font-bold'>Password</label>
                    <input
                        id='password'
                        className='w-full p-2 border border-gray-300 rounded text-black'
                        type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isPasswordValid && <span className='text-red-500 text-sm'>Password must be at least 6 characters</span>}
                </div>
                {/* Phone input */}
                <div className="w-full mb-4">
                    <label className='block text-left mb-2 font-bold'>Phone</label>
                    <input
                        id='ph'
                        className='w-full p-2 border border-gray-300 rounded text-black'
                        type="text" placeholder="Your Phone Number"
                        value={ph}
                        onChange={(e) => setPh(e.target.value)}
                    />
                    {!isPhoneValid && <span className='text-red-500 text-sm'>Invalid phone number</span>}
                </div>
                {role === "owner" && (
                    <div className="w-full mb-4">
                        <label className='block text-left mb-2 font-bold'>Maximum Booking per day</label>
                        <input
                            id='address'
                            className="w-full p-2 border border-gray-300 rounded text-black"
                            placeholder="Your Address"
                            value={maxLimit}
                            onChange={(e) => setMaxLimit(e.target.value)}
                            required={role === "owner"}></input>
                    </div>
                )}
                {/* Address input (only for owners) */}
                {role === "owner" && (
                    <div className="w-full mb-4">
                        <label className='block text-left mb-2 font-bold'>Address</label>
                        <textarea
                            id='address'
                            className="w-full p-2 border border-gray-300 rounded text-black"
                            placeholder="Your Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required={role === "owner"}></textarea>
                    </div>
                )}

                {/* Register button */}
                <button type="submit" className="w-full p-2 bg-green-500 text-white rounded text-lg" disabled={!isFormValid}>Register</button>
            </form>
        </div>
    );
}

export default Register
