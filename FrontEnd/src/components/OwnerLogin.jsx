import React from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';


const OwnerLogin = () => {
    const navigate = useNavigate();
    const handleSignUp = (e) => {
        e.preventDefault()
        navigate('/register')
    }
    const handleSignIn = (e) => {
        e.preventDefault()
        navigate('/ownerLogin')
    }
    return (
        <>
            <div className="login-container">
                <h2 className='text-4xl'>For <span className='text-emerald-800'>Owners</span></h2>
                <p>We are the market-leading bike service platform to manage your services efficiently.</p>
                <button onClick={handleSignIn}>Login</button>
                <p>Don't have an account? <a className='font-bold onClick={handleSignUp}' onClick={handleSignUp}>Sign up</a>.</p>
            </div>
        </>
    );
};

export default OwnerLogin;
