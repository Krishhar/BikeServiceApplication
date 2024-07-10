import React from 'react';
import OwnerLogin from '../components/OwnerLogin';
import CustomerLogin from '../components/CustomerLogin';
import '../styles/Login.css';
import BikeServiceLogog from '../components/BikeServiceLogog';

// Login component
const Login = () => {
    // Render the login page
    return (
        <>
            {/* Navigation section */}
            <div className='p-5 flex justify-between bg-gray-200'>
                {/* Bike service logo */}
                <BikeServiceLogog />
            </div>
            {/* Login section */}
            <div className="login-page">
                {/* Owner login section */}
                <div className="login-section" style={{ backgroundColor: '#56c35a1f' }}>
                    {/* Render the OwnerLogin component */}
                    <OwnerLogin />
                </div>
                {/* Customer login section */}
                <div className="login-section">
                    {/* Render the CustomerLogin component */}
                    <CustomerLogin />
                </div>
            </div>
        </>
    );
};

export default Login
