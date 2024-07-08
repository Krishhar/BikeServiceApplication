import React, { useState } from 'react';
import '../styles/ownerLoginForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const OwnerLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.warn("Fill all Fields", {
                position: "bottom-right",
                autoClose: 6000,
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };

            const userData = {
                email,
                password,
            };

            const { data } = await axios.post(
                "/api/owner/login",
                userData,
                config
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate('/OwnerPage');
        } catch (err) {
            toast.error(`Error Occurred! ${err.response?.data?.message || err.message}`, {
                position: "bottom-right",
                autoClose: 5000,
            });
        }
    } 

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

export default OwnerLoginForm;
