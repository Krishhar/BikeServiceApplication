import React from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';


const CustomerLogin = () => {
    const navigate = useNavigate();
    const handleSignUp = (e) => {
        e.preventDefault()
        navigate('/register')
    }
    const handleSignIn = (e) => {
        e.preventDefault()
        navigate('/customerLogin')
    }
    return (
        <div className="login-container">
            <h2 className='text-4xl'>For <span className='text-emerald-800'>Customers</span></h2>
            <p>Join our platform to book services, track your vehicle, and get the best service experience.</p>
            <button onClick={handleSignIn}>Login</button>
            <p>Don't have an account? <a className='font-bold cursor-pointer' onClick={handleSignUp}>Sign up</a>.</p>
        </div>
    );
};

export default CustomerLogin;
